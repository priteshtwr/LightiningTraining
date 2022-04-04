import { Lightning } from "@lightningjs/sdk";
import { getImageURL } from "../lib/API";

export class MovieItem extends Lightning.Component {
    static _template() {
        return {
            flexItem: false,
            Image: {
                x: 0, y: 540, mount: 0.5,
                src: null
            },
           
        }
    }

    _init() {
    }

    set movie( item ){
        this.tag("Image").patch({src: getImageURL(item.poster_path, 300)})
        
    }

}