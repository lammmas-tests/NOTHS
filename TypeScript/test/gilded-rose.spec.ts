import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

const items = [
  {
		name: 'Regular',
		item: new Item('foo', 9, 10),
		expected: 4,
		days: 5
	},
  {
		name: 'Last day',
		item: new Item('foo', 9, 10),
		expected: 2,
		days: 9
	},
  {
		name: 'Low Quality (expired)',
		item: new Item('foo', 3, 14),
		expected: 1,
		days: 9
	},
 {
		name: 'High Quality (expired)',
		item: new Item('foo', 3, 94),
		expected: 39,
		days: 30
	},
  {
		name: 'Low Quality Aged Brie',
		item: new Item('Aged Brie', 9, 10),
    expected: 18,
		days: 9
	},
  {
		name: 'High Quality Aged Brie',
		item: new Item('Aged Brie', 3, 94),
    expected: 50,
		days: 30
	},
  {
		name: 'AgedBrie',
		item: new Item('AgedBrie', 3, 3),
		expected: 50,
		days: 30
	},
  {
		name: 'Sulfuras, Hand of Ragnaros',
		item: new Item('Sulfuras, Hand of Ragnaros', 9, 10),
		expected: 80,
		days: 9
	},
  {
    name: 'Backstage pass more than 10 days away',
    item: new Item('Backstage passes to a TAFKAL80ETC concert', 9, 14),
    expected: 10,
    days: 1
  },
  {
    name: 'Backstage pass less than 10 days away',
    item: new Item('Backstage passes to a TAFKAL80ETC concert', 9, 14),
    expected: 16,
    days: 5
  },
  {
    name: 'Backstage pass less than 5 days away',
    item: new Item('Backstage passes to a TAFKAL80ETC concert', 9, 14),
    expected: 28,
    days: 10
  },
  {
		name: 'Backstage pass on last day',
		item: new Item('Backstage passes to a TAFKAL80ETC concert', 9, 10),
		expected: 30,
		days: 9
	},
  {
		name: 'Backstage pass after sell by',
		item: new Item('Backstage passes to aTAFKAL80ETC concert', 9, 50),
		expected: 0,
		days: 19
	},
  {
		name: 'Conjured',
		item: new Item('Conjured Apple iPhone', 3, 14),
		expected: 8,
		days: 3
	}
 ];

describe('Gilded Rose', () => {
  it('should store the passed in item correctly', () => {
    const gildedRose = new GildedRose([ new Item('somename', 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('somename');
  });

  items.forEach(itm => {
    it(`should update quality of '${itm.name}' item correctly after ${itm.days} days has passed`, () => {
      const rose = new GildedRose([itm.item]);

      // Update the quality for each day within the sell in time
      for (let days = itm.days; days > 1; days--) {
        rose.updateQuality();
      }

      const result = rose.items[0];

      expect(result.quality).to.equal(itm.expected);
    });
  });
});
