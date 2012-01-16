


var ConstraintSlider = {

    sliders: [],

    init: function(params) {

        var compile_time_params = Object.extend({

        }, params || {});

        if(!$('constraint_slider_template')) {
            return null;
        }

        this.template = doT.template($('constraint_slider_template').text, undefined, compile_time_params);

    },

    create: function(node_id, params) {
     
        var slider = new this.slider_class(this, node_id, params);
        if(!slider) {
            return null;
        }

        this.sliders.push(slider);
        return slider;
    },


    destroy: function(slider) {

        var i;
        for(i=0; i < this.sliders.length; i++) {
            if(this.sliders[i] == slider) {
                this.sliders.splice(i, 1);
                return true;
            }
        }
        return false;
    },

    slider_class: function(parent, node_id, params) {

        this.parent = parent;

        if(!$(node_id)) {
            return null;
        }

        this.node_id = node_id;
        this.params = Object.extend({
            foo: 'bar'
        }, params || {});

        var result = this.parent.template({});

        $(node_id).innerHTML = result;

    }

};


