/* eslint-disable */

export default {
    actions: {
        notic({ dispatch, commit }, html) {
            let timer = 3000

            let notic = document.createElement('div')
            notic.className = 'notic'

            let noticBlock = document.createElement('div')
            noticBlock.className = 'notic__block'

            noticBlock.append(html)
            notic.append(noticBlock)

            let $notic = document.querySelector('.notic')
            if (!$notic) {
                document.body.append(notic)
            }

            let $noticDom = document.querySelector('.notic')
            $noticDom.append(noticBlock)
            setTimeout(noticRemove, timer, noticBlock)

            function noticRemove(noticBlock) {
                noticBlock.remove()
                let $notic = document.querySelector('.notic')
                if (!$notic.firstElementChild) $notic.remove()
            }
        },
    },
    // install(Vue, options) {
    //     Vue.prototype.$message = function(html) {
    //         M.toast({ html })
    //     }
    //     Vue.prototype.$error = function(html) {
    //         M.toast({ html: `[Ошибка] : ${html}` })
    //     }
    // },
}
