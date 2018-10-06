var sort = function(array) {
  this.cache = Array.isArray(array) ? array : [];
};

sort.prototype = {
  log: function() {
    console.log(this.cache);
  },
  sort: function(cb) {
     var array = this.cache,
         cbRes;

      /**
          *Necessary operations in this function:
              --Use logic to determine if the two indexes/params are
                not equal, so we can determine the order of the parameters being
                passed in from the anonymous callback.

                    ** If it is not equal, determine if the passed in callback
                       is equal to the defined ascending or descending callbacks.

                    ** If it matches the defined ascending function, return a string
                       "ascending".

                    ** If it matches the defined descending function, return a string
                       "descending"

              --Use logic to determine if all indexes in the array are
                equal.

                    **If second conditional is true, just return the array without
                      mutating it.

      */

      /***
        checkOrder: function that takes in two immediate indexes of an array and uses
        those arguments to test if the passed in callback is equal to an ascending or
        descending function.
      */

     var checkOrder = function(a, b, cb) {
       //future refactoring: I don't need to pass in the two array indexes because it's already stored in the cache
       var ascendingCallback = function(a, b) {
          return a - b;
       };
       var descendingCallback = function(a, b) {
         return b - a;
       };

       if ( cb(a, b) === ascendingCallback(a, b) ) {
         console.log('Passed in callback is ascending!');
         return 'ascending';
       }

       if ( cb(a, b) === descendingCallback(a, b) ) {
         console.log('Passed in callback is descending!');
         return 'descending';
       }

       return console.log('Invalid callback passed in!');
     };

    /**
      orderType: loops through the passed in array,
      checks if both immediate indexes exist and if they are not
      equal so we can definitely determine the order of the params.

      Once it passes the conditional, we set cbRes to checkOrder(),
      pass in the array indexes and the callback to determine which
      order the callback wants.

      After checkOrder is done, it will return cbRes,which holds a
      string indicating the order type.
    */

    var orderType = function() {
       for (var i = 0, l = array.length; i < l; i++) {
           if (array[i] && array[i+1] && array[i] !== array[i+1]) {
              cbRes = checkOrder(array[i], array[i+1], cb);
           }

           console.log('Passed conditional at index: ', i)
           return cbRes;
       }
      return cbRes;
    };

   var sortByType = function(type) {
     var greater;

     if (type) {

       switch(type) {
         case 'ascending':

           for (var i = 0, l = array.length; i < l; i++) {
               for (var j = 0, len = array.length; j < len; j++) {
                   if ( j < (len - 1) ) {
                        if ( cb(array[j], array[j+1]) >= 1 ) {
                            greater = array[j];
                            array[j] = array[j+1];
                            array[j+1] = greater;
                        }
                   } else {
                     console.log("passed the end of the array");
                   }
               }
           }
           return array;
           break;
         case 'descending':

           for (var i = 0, l = array.length; i < l; i++) {
               for (var j = 0, len = array.length; j < len; j++) {
                   if ( j < (len - 1) ) {
                      if ( cb(array[j], array[j+1]) >= 1 ) {//this conditional is very important for the sort to work
                           greater = array[j+1];
                           array[j+1] = array[j];
                           array[j] = greater;
                      }
                   } else {
                     console.log("passed the end of the array");
                   }
               }
           }
           return array;
           break;
         default:
           console.log('Not a valid type I guess?');
           break;
       }
       return array;
     }
     console.log('Not a valid type')
     return;
   };

   orderType();
   sortByType(cbRes);

   return array;
  }
};

module.exports = sort;
