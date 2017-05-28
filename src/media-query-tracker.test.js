import test from 'ava'
import {
	reducer,
	mediaChanged,
	mediaQueryTracker,
	unlisten,
} from './media-query-tracker'

test('reducer works', t => {
	t.deepEqual(reducer({}, mediaChanged({innerHeight: 123})), {
		innerHeight: 123,
	})
})

test('reducer keeps other data', t => {
	t.deepEqual(reducer({foo: 3}, mediaChanged({innerHeight: 123})), {
		foo: 3,
		innerHeight: 123,
	})
})

test('mediaQueryTracker works outside browser', t => {
	const dispatch = () => {}
	let unlisten
	t.notThrows(() => {
		unlisten = mediaQueryTracker({
			isPhone: 'screen and (max-width: 767px)',
		})
	}, dispatch)
	t.notThrows(unlisten)
})

// TODO create redux store; mock matchmedia and addEventListener
test.todo('calls matchMedia if needed')
test.todo('calls addEventListener if needed')
test.todo('unlisten unlistens')
test.todo('mediaQueryTracker works as thunking action')
