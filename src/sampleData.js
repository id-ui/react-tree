export const nodes = [
  {
    label: 'Cake',
    name: 'Cake',
    icon: '🍰',
    childNodes: [
      {
        label: 'Chocolate',
        name: 'Chocolate',
        icon: '🍫',
      },
      {
        label: 'Vanilla',
        name: 'Vanilla',
        icon: '🍬',
      },
      {
        label: 'Strawberry',
        name: 'Strawberry',
        icon: '🍓',
      },
    ],
  },
  {
    label: 'Drink',
    name: 'Drink',
    icon: '🍹',
    childNodes: [
      {
        label: 'Coffee',
        name: 'Coffee',
        icon: '☕️',
        childNodes: [
          {
            label: 'Cappuccino',
            name: 'Cappuccino',
          },
          {
            label: 'Latte',
            name: 'Latte',
          },
          {
            label: 'Americano',
            name: 'Americano',
          },
        ],
      },
      {
        label: 'Hot Chocolate',
        name: 'HotChocolate',
        icon: '🧋',
      },
      {
        label: 'Tea',
        name: 'Tea',
        icon: '🫖',
        childNodes: [
          {
            label: 'Green',
            name: 'Green',
          },
          {
            label: 'Herbal',
            name: 'Herbal',
          },
          {
            label: 'Black',
            name: 'Black',
            childNodes: [
              {
                label: 'With Sugar',
                name: 'WithSugar',
              },
              {
                label: 'Without Sugar',
                name: 'WithoutSugar',
              },
            ],
          },
        ],
      },
      {
        label: 'Milk Cocktail',
        name: 'MilkCocktail',
        disabled: true,
        icon: '🍶',
        childNodes: [
          {
            label: 'Vanilla',
            name: 'VanillaCocktail',
            value: true,
          },
          {
            label: 'Chocolate',
            name: 'ChocolateCocktail',
          },
          {
            label: 'Strawberry',
            name: 'StrawberryCocktail',
          },
          {
            label: 'Banana',
            name: 'BananaCocktail',
          },
        ],
      },
      {
        label: 'Hot Milk',
        name: 'HotMilk',
        icon: '🥛',
      },
    ],
  },
];
