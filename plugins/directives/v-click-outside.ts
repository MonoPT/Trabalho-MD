export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', {
        created(el, binding, vnode, prevVnode) { //Create event
            const data = {
                el: vnode.el,
                binding: binding.value
            }
            
            const eventHandler = handleClick.bind(this, data)

            el.clickOutsideEventHandler = eventHandler

            window.addEventListener("click", eventHandler)
        },
        beforeUnmount(el, binding, vnode, prevVnode) { //Remove event
            const eventHandler = el.clickOutsideEventHandler

            window.removeEventListener("click", eventHandler)
        }
        
    })
})

function handleClick(args, event) {
    const clickedElement = event.target;
    const checkElement = args.el;


    let currentNode = clickedElement;

    let returnValue = false;
    
    while (currentNode.nodeName != 'HTML') {

        if(currentNode === checkElement) {
            returnValue = true;
            break;
        }
        currentNode = currentNode.parentNode
    }


    args.binding(!returnValue) //Value is inverted on return so that it detects outside inputs
    return returnValue
}