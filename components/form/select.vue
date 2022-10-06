<template>
    <div class="select" :class="`${dropDownIsCollapsed ? '' : 'showDropDown'}`" v-click-outside="HandleClickOutside">
        <div class="currentOption" @click="ToggleDropDown">{{currentOption}}</div>
        <transition name="showOptions">
            <div class="wrap" v-if="!dropDownIsCollapsed">
                <div :class="`options ${alignPos}`" v-if="!storeScreenHandler.isMobile">
                    <option v-for="(option, i) in optionList" :key="i" @click="ChangeToOption(i)">{{option}}</option>
                </div>
            </div>
            
        </transition>
        
        <Teleport to="#popUpsModels">
            <transition name="showOptions">
                    <div id="modal-container-options" v-if="!dropDownIsCollapsed && storeScreenHandler.isMobile">
                        <div class="modal-container">
                            <div class="options-container">
                                <template v-for="(option, i) in optionList" :key="i">
                                    <div class="option" @click="ChangeToOption(i)">{{option}}</div>
                                </template>
                            </div>
                        </div>
                    </div>
            </transition>
        </Teleport>



        <div class="data-wrapper" v-show="false" ref="optionsRawData">
            <slot ></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useScreenHandler } from '~~/stores/ScreenHandler'
    const storeScreenHandler = useScreenHandler()

    const emit = defineEmits(['dataUpdate'])

    const props = defineProps({
        emitName: {
            type: String,
            required: true
        },
        initialValue: {
            type: String,
            required: false,
            default: null
        },
        updateUrl: {
            type: Boolean,
            required: false,
            default: false
        }

    })

    const optionsRawData = ref(null)

    const currentOption = ref('Opção atual')
    const optionList = ref([])
    const dropDownIsCollapsed = ref(true)
    let updatedInitialValue = false;

    onMounted(() => {
        updateList();
        observer.observe(optionsRawData.value, Observerconfig)
    })

    onUnmounted(() => {
        observer.disconnect();
    })

    const ChangeToOption = (i, emitMessage = true) => {
        currentOption.value = optionList.value[i]
        if(emitMessage) {
            ToggleDropDown()
            emit('dataUpdate', {emitEventName: props.emitName, value: currentOption.value, updateUrl: props.updateUrl});
            //console.log({emitEventName: props.emitName, value: currentOption.value})
        }
    }
    
    const alignPos = ref('left')
    const ToggleDropDown = () => {
        const currentOption: any = event.target


        dropDownIsCollapsed.value = !dropDownIsCollapsed.value;

        if(storeScreenHandler.isMobile) return

        setTimeout(() => {
            try {
                const dropBoxElement: HTMLElement = currentOption.parentNode.parentNode.children[1].children[1];
                const dropBoxSize = dropBoxElement.getBoundingClientRect();

                const dropBoxOptions = dropBoxElement.children[0].getBoundingClientRect()
                
                alignPos.value = 'left'
                if(dropBoxSize.x + dropBoxOptions.width + 30 > storeScreenHandler.screenSize.w) {
                    alignPos.value = 'right'
                }
            } catch {
                return
            }

        }, 90);

        
        
    }

    const HandleClickOutside = (ClickedOutside) => {
        if(ClickedOutside) dropDownIsCollapsed.value = true;
    }

    //Verifica se número de childrens foi alterado
    const Observerconfig = {childList: true};
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            updateList();
        });
    });

    const updateList = () => {
        optionList.value = [];
        Array.from(optionsRawData.value.children).forEach( (option:any) => {
            optionList.value.push(option.textContent)
        })

        if(!optionList.value.includes(props.initialValue) && props.initialValue !== null) {
            ChangeToOption(0, false);
            emit('dataUpdate', {emitEventName: props.emitName, value: 'All products', updateUrl: false});
        } else
        if(optionList.value.includes(props.initialValue) && props.initialValue !== null) {
            currentOption.value = props.initialValue;
            updatedInitialValue = true;
        }

        if(!updatedInitialValue) currentOption.value = optionList.value[0]
        

        observer.observe(optionsRawData.value, Observerconfig);
    } 

    watch(() => props.initialValue, (newValue, oldValue) => {
        currentOption.value = newValue;
    });

</script>

<style scoped lang="scss">
    .select {
        --hoverColor: var(--primaryColor);

        position: relative;
        display: block;
        cursor: pointer;
        z-index: 4;
        padding-right: 1.7em;

        .currentOption {
            user-select: none; 
            transition: .12s;
            &:hover {
                color: var(--hoverColor);

                &:after {
                    border-color: var(--hoverColor);
                }
            }

            &::after {
                content: '';
                width: .5em;
                height: .5em;
                position: absolute;
                right: .3em;
                top: calc(.5em / 2);
                border-left: 1px solid #000;
                border-bottom: 1px solid #000;
                transform: rotate(-45deg);
                transition: .12s;
            }
        }

        &.showDropDown {
            .currentOption {
                &::after {
                    transform: translateY(.2em) rotate(-225deg) ;
                }
            }
        }

        .options {
            display: block;
            position: absolute;
            box-sizing: border-box;
            padding: 15px 20px;
            left: 0;
            top: 1.8em;
            min-width: 100%;
            z-index: 5;
            -webkit-box-shadow: 3px 3px 18px 2px rgba(0,0,0,0.35); 
            box-shadow: 3px 3px 18px 2px rgba(0,0,0,0.35);
            border-radius: 6px;
            background-color: var(--bgColor);
            transition: .12s;
            font-size: .85em;
            font-weight: lighter;
            max-height: 60vh;
            overflow-y: scroll;

            &.right {
                left: auto;
                right: 0;
            }

            &::-webkit-scrollbar {
                width: 9px;
            }
            &::-webkit-scrollbar-track {
                background: transparent;
                
            }
            &::-webkit-scrollbar-thumb {
                background-color: rgba(155, 155, 155, 0.5);
                border-radius: 20px;
                border: transparent;
                background-clip: padding-box;
                border-right: 4px solid transparent;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
            }

            option {
                transition: inherit;
                padding: 5px 0;

                &:not(:first-of-type) {
                    margin-top: 0.4em;
                }

                &:hover {
                    color: var(--hoverColor);
                }
            }
        }
    }


    ///Defines styles for the pop Up
   
    #modal-container-options {
        position: fixed;
        display: grid;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.202);
        z-index: 999;
        justify-content: center;
        align-items: center;
        
        .modal-container {
            position: relative;
            display: block;
            width: 80vw;
            
            padding: 15px;
            padding-inline: 5px;
            background: var(--bgColor);
            border-radius: .8em;
            
            -webkit-box-shadow: 5px 5px 8px 2px rgba(32,32,32,0.26); 
            box-shadow: 5px 5px 8px 2px rgba(32,32,32,0.26);
            z-index: 1000;

           

            .options-container {
                position: relative;
                display: block;
                height: 100%;
                width: 100%;
                max-height: 80vh;
                min-height: 20px;
                overflow-y: scroll;

                &::-webkit-scrollbar
                {
                    width: 3px;
                    background-color: transparent;
                }

                &::-webkit-scrollbar-thumb
                {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: rgba(0, 0, 0, 0.196);
                }

                .option {
                    display: block;
                    position: relative;
                    font-size: 23px;

                    padding-top: 8px;
                    padding-bottom: 8px;

                    border-top: 1px solid rgba(0, 0, 0, 0.123);

                    &:nth-child(1) {
                        margin-top: 0;
                        border-top: none;
                    }

                    &:hover {
                        background: #35a2d153;
                        cursor: pointer;
                        border-color: transparent;
                        border-radius: .2em;
                        transition: .12s;
                    }
                }
            }
        }
    }




    ///Options animation show
    .showOptions-enter-active,
    .showOptions-leave-active {
    transition: opacity .25s ease;
    }

    .showOptions-enter-from,
    .showOptions-leave-to {
    opacity: 0;
    }
</style>