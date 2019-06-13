export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
      this.items = items;
    }

    updateQuality() {
      this.items.forEach((item, idx) => {
        // Converting the name to lower case because we don't trust user input
        const name = item.name.toLowerCase();
        let quality = item.quality;
        const isAgedBrie = name === 'aged brie' || name === 'agedbrie';
        // For the sake of simplicity in this test task, I'm only going to test if the name starts with the special
        // case string. In real world, either the user input would be limited and an enum/mapping/etc created,
        // or all the possible cases would be considered (ex. Metallica Backstage passes)
        const isBackstagePass = name.startsWith('backstage pass');
        const isSulfuras = name.startsWith('sulfuras');
        const isConjured = name.startsWith('conjured');

        if (isSulfuras) {
          // Sulfuras is static - its quality is always 80, and it never expires, regardless of
          // the original quality/expiry of the item
          this.items[idx].quality = 80;
          return;
        } else if (isBackstagePass) {
          // Reset quality to 0 if the sellIn date limit has passed
          if (item.sellIn < 0) quality -= quality;
          else quality += item.sellIn > 10 ? 1 : (item.sellIn > 5 ? 2 : 3);
        }
        else if (isAgedBrie) quality++;
        else if (isConjured) quality -= 2;
        else quality -= item.sellIn >= 0 ? 1 : 2;

        if (quality < 0) quality = 0;
        else if (quality > 50) quality = 50;

        this.items[idx].quality = quality;
        this.items[idx].sellIn--;
      });

      return this.items;
    }
}
