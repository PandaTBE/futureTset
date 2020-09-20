
import usersDataReduser, { setUsers } from '../redux/usersDataReducer';


test('users should be added', () => {

    const state = {
        users: []
    }
    const action = setUsers([{
        id: 270,
        firstName: "Nicole",
        lastName: "Lowe",
        email: "LBuckham@porta.gov",
        phone: "(679)792-1546",
        address: {},
        description: "amet rutrum magna aliquam pretium suspendisse hendrerit consequat amet risus vitae sit sed pulvinar sollicitudin sed pretium odio sit consectetur quis dui vestibulum at morbi libero sollicitudin augue aenean pretium convallis tincidunt"
    }])

    const newState = usersDataReduser(state, action);

    expect(newState.users.length).toBe(1);
});
