(function() {
  'use strict';
  
  var vm = new Vue({
    el: "#app",
    data: {
      newItem: "",
      todos: []
    },
    watch : {
      todos: {
        handler: function(){
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      }
    },
    mounted: function (argument) {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      addItem: function() {
        //e.preventDefault();
        var item = {
          title: this.newItem,
          isDone: false
        };
        this.todos.push(item);
        this.newItem = "";
      },
      deleteItem: function(index) {
        if(confirm('are you sure?')){
          this.todos.splice(index, 1);
        }
      },
      purge: function() {
        if(!confirm('delete finished?')){
          return;
        }
        this.todos = this.todos.filter((todo) => {
          return !todo.isDone;
        });
      }
    },
    computed: {
      remaining: function() {
        var items = this.todos.filter((todo) => {
          return !todo.isDone;
        });
        return items.length;
      }
    }
  })
})();