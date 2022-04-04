import { Lightning, Router, Utils } from "@lightningjs/sdk";

export class Movie extends Lightning.Component {
    static _template() {
        return {
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff3c99f6
            },
            Label: {
                x: 960,
                y: 540,
                mount: 0.5,
                text: {
                    lineHeight: 96, fontSize:48, textAlign: 'center', text: 'TMDB - Coming Soon Movies Menu\nPress OK to Enter the Menu'
                }
            }
        }
    }


    _init() {
        
    }

    _focus() {
    }

    _handleEnter() {
        Router.focusWidget('Movies');
    }

    _handleBack() {
    }


}