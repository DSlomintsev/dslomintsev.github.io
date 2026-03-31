function addGoods(){
    var itemsDataRaw = `{
  "Items": [
    {
      "Id": 0,
      "Name": "Smoking Hot",
      "Type": "Парфуми",
      "Class": "Нішеві",
      "Sex": "Унісекс",
      "TopNotes": "Кориця, Яблучний кальян",
      "HeartNotes": "Дубовий мох, Тютюн",
      "Base": "Бурбонська ваніль, Орканокс"
    },
    {
      "Id": 1,
      "Name": "Escada Moon Sparkle",
      "Type": "Парфуми",
      "Class": "Елітна",
      "Sex": "Жіночі",
      "TopNotes": "Чорна смородина, цитруси, полуниця, червоне яблуко",
      "HeartNotes": "Біла фрезія, солодкий горошок, жасмин, троянда",
      "Base": "Сандал, амбра, мускус, малина"
    },
    {
      "Id": 2,
      "Name": "Dahab",
      "Type": "Парфуми",
      "Class": "Нішеві",
      "Sex": "Жіночі",
      "TopNotes": "Бергамот, Яблука Гренні Сміт",
      "HeartNotes": "Кедр, Коріандр, Маракуя",
      "Base": "Амбра, Мускус, Пачулі"
    },
    {
      "Id": 3,
      "Name": "Ruby Kajal",
      "Type": "Парфуми",
      "Class": "Нішеві",
      "Sex": "Унісекс",
      "TopNotes": "Ананас, Вишня, Кокос, Мигдаль",
      "HeartNotes": "Збиті вершки, Коричневий цукор,Морозиво",
      "Base": "Амбра, Бензоїн, Боби тонка, Ваніль,Мускус"
    },
    {
      "Id": 4,
      "Name": "Merry Me Lanvin",
      "Type": "Парфуми",
      "Class": "Елітна",
      "Sex": "Жіночі",
      "TopNotes": "Гіркий апельсин, біла фрезія, персик",
      "HeartNotes": "Жасмин, троянда, магнолія",
      "Base": "Мускус, кедр з верджинії, амбра"
    },
    {
      "Id": 5,
      "Name": "Ocean di Gioia Armani",
      "Type": "Парфуми",
      "Class": "Елітна",
      "Sex": "Жіночі",
      "TopNotes": "Груша, цитрус, зелені ноти",
      "HeartNotes": "Водяний жасмін, сіль, конвалія , троянда",
      "Base": "Мускус, сандал"
    },
    {
      "Id": 6,
      "Name": "Imagination Louis Vuitton",
      "Type": "Парфуми",
      "Class": "Елітні",
      "Sex": "Чоловічі",
      "TopNotes": "Імбир, Туніський неролі, Цейлонська кориця",
      "HeartNotes": "Ambroxan, Гуаякове дерево, Олібанум, Чорний чай",
      "Base": "Калабрійський бергамот, Сицилійський апельсин, Цитрон"
    },
    {
      "Id": 7,
      "Name": "Mochino I Love Love",
      "Type": "Парфуми",
      "Class": "Елітна",
      "Sex": "Жіночі",
      "TopNotes": "Грейпфрут, лимон, апельсин, червона смородина",
      "HeartNotes": "Конвалія, чайна троянда, камиш, кориця",
      "Base": "Мускус, деревина танака, кедр"
    },
    {
      "Id": 8,
      "Name": "Ange ou Demon La Secret",
      "Type": "Парфуми",
      "Class": "Елітна",
      "Sex": "Жіночі",
      "TopNotes": "Італійський лимон, клюква, чайне листя",
      "HeartNotes": "Жасмин самбак, білий піон, водяна лілія",
      "Base": "Деревина светлого дерева, пачулі, білий мускус"
    },
    {
      "Id": 9,
      "Name": "Narcotic Delight Initio",
      "Type": "Парфуми",
      "Class": "Нішеві",
      "Sex": "Унісекс",
      "TopNotes": "Вишня, Рожевий перець, Чорний перець",
      "HeartNotes": "Гедіон, Коньяк",
      "Base": "Ваніль, Тютюн"
    }
  ]
}`;
var productsEl = document.getElementById("productsContainer");
var itemsData = JSON.parse(itemsDataRaw);

itemsData.Items.forEach(itemData => {
    productsEl.innerHTML+=`<div class="product-card">
      <div class="product-img-wrap">
        <span class="product-badge">Хіт продажів</span>
        <img src="images/${itemData.Id}.jpg?auto=format&fit=crop&q=80&w=800" alt="Флакон парфумів Nuit Dorée" loading="lazy">
      </div>
      <div class="product-info">
        <p class="product-number">№ 01</p>
        <h3 class="product-name">${itemData.Name}</h3>
        <p class="product-desc">${itemData.Base}</p>
        <div class="product-footer">
          <span class="product-price">$15</span>
          <button class="add-btn">Скоро у продажу</button>
        </div>
      </div>
    </div>`;
});

}

window.addEventListener('load', function() {
    addGoods();
});