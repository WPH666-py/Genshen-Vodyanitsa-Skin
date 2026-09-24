// ============================================================
// 沃雅妮莎（Vodyanitsa）动态皮肤插件 · Host（独立版 v5 统一版 · 可选）
// ------------------------------------------------------------
// 零配置模式（推荐）无需本文件：client.js 已内嵌素材。
// 想要原图画质时，把本文件内容粘贴到 code.host、client.js
// 粘贴到 code.client 一起 define/run 即可。客户端会自动检测
// 到本 Host 并切换为路由素材。
// 唯一需要修改的：把 ASSET_DIR 改成素材文件夹在你机器上的
// 绝对路径（Windows 用正斜杠或双反斜杠）。
// ============================================================
const ASSET_DIR = 'D:/projects-py/Genshen-skins/Genshen-Vodyanitsa-Skin/dsh-plugin/素材'
const MAX_BYTES = 8 * 1024 * 1024
const ROUTES = [
  { route: '/vodyanitsa-skin/wall1.jpg', file: 'wall1.jpg', type: 'image/jpeg' },
  { route: '/vodyanitsa-skin/wall2.jpg', file: 'wall2.jpg', type: 'image/jpeg' },
  { route: '/vodyanitsa-skin/wall3.jpg', file: 'wall3.jpg', type: 'image/jpeg' },
  { route: '/vodyanitsa-skin/burst.mp3', file: '语音-元素爆发·其一.mp3', type: 'audio/mpeg' },
]
const join = (dir, name) => dir.replace(/[\\/]+\s*$/, '') + '/' + name

return {
  apply(ctx) {
    const fs = ctx.get('fs')
    const webServer = ctx.get('webServer')
    if (fs === undefined || webServer === undefined) {
      console.error('vodyanitsa-skin: host services fs/webServer unavailable')
      return
    }
    const cleanup = []
    const cache = new Map()
    const load = (file) => {
      if (!cache.has(file)) {
        cache.set(file, (async () => {
          const target = await fs.resolve(join(ASSET_DIR, file))
          return await fs.readBytes(target, undefined, MAX_BYTES)
        })())
      }
      return cache.get(file)
    }
    for (const route of ROUTES) {
      try {
        cleanup.push(webServer.register({
          kind: 'exact',
          path: route.route,
          handler: async (req, res) => {
            try {
              const bytes = await load(route.file)
              res.writeHead(200, {
                'Content-Type': route.type,
                'Content-Length': String(bytes.length),
                'Cache-Control': 'no-cache',
              })
              res.end(bytes)
            } catch (error) {
              console.error('vodyanitsa-skin: serve failed', route.file, error)
              if (!res.headersSent) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
              }
              res.end('asset unavailable: ' + route.file)
            }
          },
        }))
      } catch (error) {
        console.error('vodyanitsa-skin: route register failed', route.route, error)
      }
    }
    cleanup.push(harness.handle('vodyanitsa-urls', () => ({
      walls: ['/vodyanitsa-skin/wall1.jpg', '/vodyanitsa-skin/wall2.jpg', '/vodyanitsa-skin/wall3.jpg'],
      burst: '/vodyanitsa-skin/burst.mp3',
    })))
    cleanup.push(harness.handle('vodyanitsa-status', async () => {
      const status = {
          wall1Ok: false, wall2Ok: false, wall3Ok: false, burstOk: false,
          detail: '', voiceText: '——水波为证。', skill: '清露涟漪',
        }
      for (const route of ROUTES) {
        try {
          const bytes = await load(route.file)
          const ok = bytes !== undefined && bytes.length > 0
            if (route.route.indexOf('wall1') >= 0) status.wall1Ok = ok
            else if (route.route.indexOf('wall2') >= 0) status.wall2Ok = ok
            else if (route.route.indexOf('wall3') >= 0) status.wall3Ok = ok
            else status.burstOk = ok
        } catch (error) {
          status.detail += String((error && error.message) || error).slice(0, 160) + ' '
        }
      }
      return status
    }))
    cleanup.push(harness.handle('vodyanitsa-uninstall', async () => {
      const removed = cleanup.splice(0).map((dispose) => { try { dispose() } catch (e) {} })
      console.log('vodyanitsa-skin: host 侧素材路由与 RPC 已全部移除（' + removed.length + ' 项）。插件记录仍存在，如需彻底删除请让 AI 执行 cordis_undefine vodyanitsa-1')
      return { ok: true, removed: removed.length }
    }))
    ctx.effect(() => () => {
      for (const dispose of cleanup.splice(0)) { try { dispose() } catch (e) {} }
    })
  },
}
