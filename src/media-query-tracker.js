const listeners = []
export const MEDIA_CHANGED = '@@rdx-mqt/MEDIA_CHANGED'

// Reducer
export function reducer(state = {}, action) {
	switch (action.type) {
		case MEDIA_CHANGED:
			return Object.assign({}, state, action.data)
		default:
			return state
	}
}

// Actions
export function mediaChanged(data) {
	return {
		type: MEDIA_CHANGED,
		data
	}
}

let trackInnerWidth = false
let trackInnerHeight = false
let onResize
const getSizes = (data) => {
	if (trackInnerWidth) {
		data.innerWidth = global.innerWidth
	}
	if (trackInnerHeight) {
		data.innerHeight = global.innerHeight
	}
}
const makeOnResize = dispatch => {
	const data = {}
	getSizes(data)
	dispatch(mediaChanged(data))
}
function trackMediaQuery(label, query, dispatch, initData) {
	// special queries
	if (label === 'innerWidth' || label === 'innerHeight') {
		if (label === 'innerWidth') {
			trackInnerWidth = true
		}
		if (label === 'innerHeight') {
			trackInnerHeight = true
		}
		if (!onResize) {
			onResize = makeOnResize(dispatch)
			if (global.addEventListener) {
				global.addEventListener('resize', onResize, true)
			}
		}
		getSizes(initData)
	}

	const mq = global.matchMedia(query)

	const listener = () => dispatch(mediaChanged({
		[label]: mq.matches
	}))
	mq.addListener(listener)

	initData[label] = mq.matches
	return
}

export function mediaQueryTracker(queries, dispatch) {
    const initData = {}
		if (global.matchMedia) {
			for (const label in queries) {
				trackMediaQuery(label, queries[label], dispatch, initData)
			}
			dispatch(mediaChanged(initData))
		}
}
