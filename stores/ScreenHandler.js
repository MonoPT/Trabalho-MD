import { defineStore } from 'pinia'

export const useScreenHandler = defineStore('useScreenHandler', () => {
    const screenSize = reactive({
        w: 0,
        h: 0
    })

    const isMobile = computed(() => screenSize.w <= 850 )
    const collapseNav = computed(() => screenSize.w <= 1250 )

    const mousePos = reactive({
        x: 0,
        y: 0
    })

    onMounted(() => {
        screenSize.w = window.innerWidth;
        screenSize.h = window.innerHeight;

        const throttledAction = throttle(requestAnimationFrame)
        
        window.addEventListener('resize', e => {
            throttledAction(() => {
                console.log("resizing")
                screenSize.w = window.innerWidth;
                screenSize.h = window.innerHeight;
            })
        })


        const throttledActionMouse = throttle(requestAnimationFrame)
        window.addEventListener('mousemove', e => {
            throttledActionMouse(() => {
                mousePos.x = e.clientX;
                mousePos.y = e.clientY;
            })
        })
    })

    function throttle (timer) {
        let queuedCallback
        return callback => {
            if (!queuedCallback) {
            timer(() => {
                const cb = queuedCallback
                queuedCallback = null
                cb()
            })
            }
            queuedCallback = callback
        }
    }

    return { 
        screenSize,
        mousePos,
        isMobile,
        collapseNav
    }
})