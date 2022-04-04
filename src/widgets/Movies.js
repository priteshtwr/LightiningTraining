import { Lightning, Router } from "@lightningjs/sdk";
import { MovieItem } from "./MovieItem";

import { getUpComingMovies } from "../lib/API";

export class Movies extends Lightning.Component {
    static _template() {
        return {
            x:0, y:0, alpha:0,
            Background: {
                rect: true,
                w: 1920,
                h: 1080,
                color: 0xff3c99f6
            },
            Label: {
                mount:0.5,x: 960,y:100,
                text: { text: "Press Right to check new upcoming movie"}
            },
            ImageContainer: {
                x:1921,
                flex: { direction: "row"}
            },
            Title: {
                x: 300, y: 540, mount: 0.5,
                text: { text: "", textColor: 0xfff1f1f1}
            },
            Action: {
                mount:0.5,
                x:960, y: 950,
                text: { text: "Press OK to see more details"}
            }
        }
    }

    async _init() {
        
        this.index = 0;
        this.carouselReset = false

        this.mList = await getUpComingMovies()
        this.tag("ImageContainer").patch( {
            children: this.mList.results.map(( item, index) => {
                return {
                    type: MovieItem,
                    zIndex: this.mList.results.length - index,
                    movie: item,
                }
            })
        })

        this.items = this.tag("ImageContainer").children
        this.items.map( item => {
            item.zoomIn = item.animation({
              duration: 1,
              actions: [
                {
                    t: 'Image',
                    p: 'scale',
                    v: {0: 1,  0.5: 1.2, 1: 1.4}
      
                },
                {
                    t: 'Image',
                    p: 'x',
                    v: { 0: 0, 0.5: -350, 1: -700}
                }
              ]
            })
            item.zoomOut = item.animation({
                duration: 1,
                actions: [
                    {
                        t: 'Image',
                        p: 'scale',
                        v: {0: 1.4, 0.5: 1.2,  1: 1}
          
                    },
                    {
                        t: 'Image',
                        p: 'x',
                        v: { 0: -700, 0.5: -350, 1: 0}
                    }
                  ]
            })
        })

        this.tag("Title").patch({ text: { text: this.mList.results[this.index].original_title}})
        
    }

    _focus() {
        this.patch({ alpha: 1})
        if( this.index > 0 )
            this.items[this.index].zoomOut.start()
        this.index = 0
        this.items[this.index].zoomIn.start()
        this.index++
        
    }

    _unfocus() {
        this.patch({ alpha: 0})
    }

    _handleRight() {
        
        this.items[this.index].zoomIn.start()
        setTimeout(() => {
            for (let [index, item] of this.items.entries()) {
                if (item.zIndex == this.items.length)
                    item.patch({ zIndex: 1 })
                else
                    item.patch({ zIndex: item.zIndex + 1 })
            }
        }, 500)

        if (this.index > 0 ) {
            this.items[this.index - 1].zoomOut.start()
        }
        else if ( this.carouselReset) {
            this.items[this.items.length-1].zoomOut.start()
            this.carouselReset = false
        }

        this.tag("Title").patch({ text: { text: this.mList.results[this.index].original_title } })
        this.index++
        if( this.index === this.items.length) {
            this.index = 0
            this.carouselReset = true
        }
    }

    _handleEnter() {
        Router.focusPage()
        Router.navigate("movie/"+this.mList.results[this.index-1].id)
        this.items[this.index-1].zoomOut.start()
    }

    _handleBack() {
        Router.focusPage()
        this.patch({ alpha: 0})
        this.items[this.index-1].zoomOut.start()
    }
}