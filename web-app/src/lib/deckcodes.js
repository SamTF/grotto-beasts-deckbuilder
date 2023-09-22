// A series of functions for working with TTS deck codes

export const editions = ['GB!', 'GBv']

export const qtyValues = {1: 'i', 2: 'j', 3: 'l'}

export const qtyToValue = x => x <= 3 ? qtyValues[x] : `(${x})`

export const valueToQty = {'i': 1, 'j': 2, 'l': 3}