export const nodes = [
  {
    label: 'Cake',
    id: 'Cake',
    icon: '🍰',
    childNodes: [
      {
        label: 'Chocolate',
        id: 'Chocolate',
        icon: '🍫',
      },
      {
        label: 'Vanilla',
        id: 'Vanilla',
        icon: '🍬',
      },
      {
        label: 'Strawberry',
        id: 'Strawberry',
        icon: '🍓',
      },
    ],
  },
  {
    label: 'Drink',
    id: 'Drink',
    icon: '🍹',
    childNodes: [
      {
        label: 'Coffee',
        id: 'Coffee',
        icon: '☕️',
        childNodes: [
          {
            label: 'Cappuccino',
            id: 'Cappuccino',
          },
          {
            label: 'Latte',
            id: 'Latte',
          },
          {
            label: 'Americano',
            id: 'Americano',
          },
        ],
      },
      {
        label: 'Hot Chocolate',
        id: 'HotChocolate',
        icon: '🧋',
      },
      {
        label: 'Tea',
        id: 'Tea',
        icon: '🫖',
        childNodes: [
          {
            label: 'Green',
            id: 'Green',
          },
          {
            label: 'Herbal',
            id: 'Herbal',
          },
          {
            label: 'Black',
            id: 'Black',
            childNodes: [
              {
                label: 'With Sugar',
                id: 'WithSugar',
              },
              {
                label: 'Without Sugar',
                id: 'WithoutSugar',
              },
            ],
          },
        ],
      },
      {
        label: 'Milk Cocktail',
        id: 'MilkCocktail',
        disabled: true,
        icon: '🍶',
        childNodes: [
          {
            label: 'Vanilla',
            id: 'VanillaCocktail',
            value: true,
          },
          {
            label: 'Chocolate',
            id: 'ChocolateCocktail',
          },
          {
            label: 'Strawberry',
            id: 'StrawberryCocktail',
          },
          {
            label: 'Banana',
            id: 'BananaCocktail',
          },
        ],
      },
      {
        label: 'Hot Milk',
        id: 'HotMilk',
        icon: '🥛',
      },
    ],
  },
];
