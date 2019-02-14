
const textEmojis = [
  'ಠ_ಠ',
  '(╯°□°）╯︵ ┻━┻',
  '(┻━┻ ︵ ヽ(°□°ヽ)',
  '(ಠ_ಠ)',
  '( ͡° ʖ̯ ͡°)',
  '＼( °□° )／',
  'ヽ(°□°ヽ)',
  '( ͡° ͜ʖ ͡°)',
];

const RandomTextEmoji = () => (
  textEmojis[Math.floor(Math.random() * textEmojis.length)]
);

export default RandomTextEmoji;
