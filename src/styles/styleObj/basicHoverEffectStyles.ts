const basicHoverEffectStyles = (hoveredBGcolor = '#ddd', textColor = '#ddd') => ({
  transition: '0.2s',
  cursor: 'pointer',
  '&:hover': {
    transition: '0.2s',
    backgroundColor: hoveredBGcolor ? hoveredBGcolor : 'transparent',
    color: textColor ? textColor : undefined,
  },
});

export default basicHoverEffectStyles;
