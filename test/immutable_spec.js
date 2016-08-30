import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
    describe('A List', () => {
        const addMovie = (state, movie) => {
            return state.push(movie);
        };

        it('is immutable', () => {
            let state = List.of('Trainspotting', '28 days later');
            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.equal(List.of(
                'Trainspotting',
                '28 days later',
                'Sunshine'
            ));

            expect(state).to.equal(List.of(
                'Trainspotting',
                '28 days later'
            ));
        });
    });

    describe('A Map', () => {
        const addMovie = (state, movie) => {
            return state.update('movies', movies => movies.push(movie));
        };

        it('is immutable', () => {
            let state = Map({
                movies: List.of('Trainspotting', '28 days later')
            });
            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.equal(Map({
                movies: List.of(
                    'Trainspotting',
                    '28 days later',
                    'Sunshine'
                )
            }));

            expect(state).to.equal(Map({
                movies: List.of(
                    'Trainspotting',
                    '28 days later'
                )
            }));
        });
    });
});
