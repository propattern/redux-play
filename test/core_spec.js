import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic ', () => {
    describe('setEntries', () => {
        it('add the entries to the state', () => {
            const state = Map();
            const entries = List.of('Trainspotting', '28 days later');
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 days later')
            }));
        });
    });

    describe('next', () => {
        it('it takes the next two entries under vote', () => {
            const state = Map({
                 entries: List.of('Trainspotting', '28 days later', 'Sunshine')
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 days later')
                }),
                entries: List.of('Sunshine')
            }));
        });

        it('puts winner of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 days later'),
                    tally: Map({
                        'Trainspotting': 66,
                        '28 days later': 22
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });

            var nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting')
            }));
        });

        it('puts both from tied vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
            }));
        });

        it('marks winner when just one entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'Trainspotting'
            }));
        });

    });

    describe('vote', () => {
        it('creates tally for a vote entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 days later')
                }),
                entries: List()
            });

            const nextState = vote(state, 'Trainspotting');

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 days later'),
                    tally: Map({
                        'Trainspotting': 1
                    })
                }),
                entries: List()
            }));
        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 days later'),
                    tally: Map({
                        'Trainspotting': 66,
                        '28 days later': 22
                    })
                }),
                entries: List()
            });

            const nextState = vote(state, 'Trainspotting');

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 days later'),
                    tally: Map({
                        'Trainspotting': 67,
                        '28 days later': 22
                    })
                }),
                entries: List()
            }));
        });
    });
});