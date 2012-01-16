


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

    create: function(container_id, params) {
     
        var slider = new this.slider_class(this, container_id, params);
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

    slider_class: function(parent, container_id, params) {

        this.parent = parent;
        this.unique = Math.floor(Math.random() * 100000000);

        if(!$(container_id)) {
            return null;
        }

        this.container_id = container_id;
        this.params = Object.extend({
            total_histogram_id: 'total_histogram_'+this.unique,
            node_id: 'constraint_slider_'+this.unique
        }, params || {});

        var result = this.parent.template(this.params);

        $(container_id).innerHTML = result;

        this.init_histogram = function(container_id) {
            if(!params.heights || (params.heights.length == 0)) {
                return null;
            }
            
            this.widget_width = $(this.params.node_id).getDimensions().width;

            var per_bar = Math.floor(this.widget_width / this.params.heights.length);
            this.histogram_bar_spacing = 2;
            this.histogram_bar_width = per_bar - this.histogram_bar_spacing;
            this.histogram_left_offset = Math.floor(this.widget_width - this.histogram_bar_width * this.params.heights.length - this.histogram_bar_spacing * (this.params.heights.length - 1));
            
            // center the histogram
            $(this.params.total_histogram_id).style.left = this.histogram_left_offset / 2 + 'px';

            var i, node;
            for(i=0; i < this.params.heights.length; i++) {
                node = this.make_histogram_bar(this.params.heights[i]);
                node.style.left = (i * this.histogram_bar_width) + (i * this.histogram_bar_spacing) + 'px';
                $(this.params.total_histogram_id).appendChild(node);
            }
        };

        this.make_histogram_bar = function(height) {
            var node = document.createElement('DIV');
            node.className = 'bar';
            node.style.width = this.histogram_bar_width + 'px';
            node.style.height = height + 'px';
            return node;
        };


        this.init_histogram();

    }

};


