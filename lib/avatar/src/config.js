export const DefaultConfig = {
  labelStyle: {
    fontSize: '16px',
    backgroundColor: '#3381D0'
  },
  labelPlaceholder: 'Unknown',
  labelFormatter: name => name.slice(0, 2).toUpperCase(),
  srcFormatter: src => {
    if (!src) {
      return ''
    }
    if (src.startsWith('http')) {
      return src
    }
    return 'data:image/jpeg;base64,' + src
  },
  size: ''
}

export const DefaultAvatarAttrs = {
  fit: 'cover',
  shape: 'circle'
}
