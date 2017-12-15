;(function(){
   "use strict";

   var doc = document,
       buildings = doc.querySelector('.buildings'),
       items = buildings.querySelectorAll('.buildings__item');
 
   for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i],
          form = item.querySelector('.estimate__form');

      form.addEventListener('submit', function(event){
         event.preventDefault();

         calculate(item);
      });
   }

   function calculate(context){
      var self = context,
          tbody = self.querySelector('.buildings__table-body'),
          rows  = tbody.querySelectorAll('.buildings__table-row'),
          result = self.querySelector('.estimate__result');

      var min = parseInt(self.querySelector('[name="min_lvl"]').value),
          max = parseInt(self.querySelector('[name="max_lvl"]').value),
          quantity = parseInt(self.querySelector('[name="quantity"]').value);

      var time = 0,
          price = 0,
          timeToShow, priceToShow;

      for (var i = 0, len = rows.length; i < len; i++) {
         var row = rows[i].dataset,
             rowLvl = parseInt(row.lvl),
             rowTime = parseInt(row.time),
             rowPrice = parseInt(row.price);

         if(rowLvl >= min && rowLvl <= max){
            time += rowTime;
            price += rowPrice;
         }
      }

      time *= quantity

      if(time >= 60 && time < 3600){
         timeToShow = (time / 60).toFixed(1) + 'м';
      }
      else if(time >= 3600 && time < 86400){
         timeToShow = (time / 3600).toFixed(1) + 'ч';
      }
      else if(time >= 86400){
         timeToShow = (time / 86400).toFixed(1) + 'д';
      }

      priceToShow = (price * quantity).toLocaleString();

      result.innerText = quantity + 'шт с ' + min + ' по ' + max + ' уровень обойдется Вам в ' + priceToShow + ' и построится за ' + timeToShow;;
   }

})();
