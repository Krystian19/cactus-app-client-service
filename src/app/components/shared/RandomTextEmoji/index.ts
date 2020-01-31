
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

export default (): string => (
  textEmojis[Math.floor(Math.random() * textEmojis.length)]
);
