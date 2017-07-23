declare namespace ScrollMagic {
    interface SceneSettings {
        /**
         The duration of the scene. If 0 tweens will auto-play when reaching the scene start point, pins will be pinned indefinetly starting at the start position.
         A function retuning the duration value is also supported. Please see Scene.duration() for details.
         */
        duration?: number | Function | string;
        /**
         Offset Value for the Trigger Position. If no triggerElement is defined this will be the scroll distance from the start of the page, after which the scene will start.
         */
        offset?: number;
        /**
         Selector or DOM object that defines the start of the scene. If undefined the scene will start right at the start of the page (unless an offset is set).
         */
        triggerElement?: string | object;
        /**
         Can be a number between 0 and 1 defining the position of the trigger Hook in relation to the viewport.
         Can also be defined using a string:

         "onEnter" => 1
         "onCenter" => 0.5
         "onLeave" => 0
         */
        triggerHook?: number | string;
        /**
         * Should the scene reverse, when scrolling up?
         */
        reverse?: boolean;
        /**
         *
         Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.

         0 => silent
         1 => errors
         2 => errors, warnings
         3 => errors, warnings, debuginfo
         */
        logLevel?: number;
    }
    interface ControllerSettings {
        container?: string | object;
        vertical?: boolean;
        globalSceneOptions?: SceneSettings;
        logLevel?: number;
        refreshInterval?: number;
    }
    class Controller {
        constructor(options?: ControllerSettings);
    }
    class Scene {
        constructor(options?: SceneSettings);

        /**
         Add the scene to a controller.
         This is the equivalent to Controller.addScene(scene).
         * @param controller
         The controller to which the scene should be added.
         */
        addTo(controller: Controller): Scene;

        /**
         * Remove the scene from the controller.
         This is the equivalent to Controller.removeScene(scene). The scene will not be updated anymore until you read it to a controller. To remove the pin or the tween you need to call removeTween() or removePin() respectively.
         */
        remove(): Scene;

        /**
         *Pin an element for the duration of the tween.
         If the scene duration is 0 the element will only be unpinned, if the user scrolls back past the start position.
         Make sure only one pin is applied to an element at the same time. An element can be pinned multiple times, but only successively. NOTE: The option pushFollowers has no effect, when the scene duration is 0.
         * @param element
         * A Selector targeting an element or a DOM object that is supposed to be pinned.

         * @param settings
         * settings for the pin
         */
        setPin(element: string | object, settings?: {
            /**
             If true following elements will be "pushed" down for the duration of the pin, if false the pinned element will just scroll past them.
             Ignored, when duration is 0.
             */
            pushFollowers?: boolean,
            spacerClass?: string
        }): Scene;

        /**
         * Updates the Scene to reflect the current state.
         This is the equivalent to Controller.updateScene(scene, immediately).
         The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.
         It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress. This means an update doesn't necessarily result in a progress change. The progress event will be fired if the progress has indeed changed between this update and the last.
         NOTE: This method gets called constantly whenever ScrollMagic detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters.
         * @param immediately
         * If true the update will be instant, if false it will wait until next update cycle (better performance).
         */
        update(immediately): Scene;

        /**
         * Set the current enabled state of the scene.
         This can be used to disable this scene without removing or destroying it.
         */
        enabled(newState): Scene;
        /**
         * Get the current enabled state of the scene.
         */
        enabled(): boolean;

        addIndicators(): Scene;

        /**
         Add a tween to the scene.
         If you want to add multiple tweens, add them into a GSAP Timeline object and supply it instead (see example below).

         If the scene has a duration, the tween's duration will be projected to the scroll distance of the scene, meaning its progress will be synced to scrollbar movement.
         For a scene with a duration of 0, the tween will be triggered when scrolling forward past the scene's trigger position and reversed, when scrolling back.
         To gain better understanding, check out the Simple Tweening example.

         Instead of supplying a tween this method can also be used as a shorthand for TweenMax.to() (see example below).

         * @param TweenObject
         A TweenMax, TweenLite, TimelineMax or TimelineLite object that should be animated in the scene. Can also be a Dom Element or Selector, when using direct tween definition (see examples).
         * @param duration
         * A duration for the tween, or tween parameters. If an object containing parameters are supplied, a default duration of 1 will be used.
         * @param params
         * The parameters for the tween
         */
        setTween(TweenObject: object|string, duration?: number | object, params?: object): Scene

        /**
         Remove the tween from the scene.
         This will terminate the control of the Scene over the tween.

         Using the reset option you can decide if the tween should remain in the current state or be rewound to set the target elements back to the state they were in before the tween was added to the scene.
         * @param reset
         */

        /**
         * Trigger an event.
         * @param {string} name
         * @param {{}} vars
         */
        trigger(name: string, vars?: object)
        on(names: string, callback: Function)
        off(names: string, callback: Function)
        removeTween(reset?: boolean): Scene;
    }
}