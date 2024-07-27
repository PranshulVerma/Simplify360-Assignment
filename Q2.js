class SocialNetwork {
    constructor() {
        this.friends = new Map();
    }

    addFriend(person, friend) {
        if (!this.friends.has(person)) {
            this.friends.set(person, new Set());
        }
        if (!this.friends.has(friend)) {
            this.friends.set(friend, new Set());
        }
        this.friends.get(person).add(friend);
        this.friends.get(friend).add(person);
    }

    getFriends(person) {
        return this.friends.has(person) ? Array.from(this.friends.get(person)) : [];
    }

    getCommonFriends(person1, person2) {
        if (!this.friends.has(person1) || !this.friends.has(person2)) {
            return [];
        }
        const friends1 = this.friends.get(person1);
        const friends2 = this.friends.get(person2);
        return Array.from(friends1).filter(friend => friends2.has(friend));
    }

    findConnectionLevel(person1, person2) {
        if (!this.friends.has(person1) || !this.friends.has(person2)) {
            return -1;
        }

        if (person1 === person2) {
            return 0;
        }

        let queue = [[person1, 0]];
        let visited = new Set();
        visited.add(person1);

        while (queue.length > 0) {
            let [current, level] = queue.shift();

            for (let friend of this.friends.get(current)) {
                if (friend === person2) {
                    return level + 1;
                }
                if (!visited.has(friend)) {
                    visited.add(friend);
                    queue.push([friend, level + 1]);
                }
            }
        }
        return -1;
    }
}

// Example usage
const network = new SocialNetwork();
network.addFriend('Alice', 'Bob');
network.addFriend('Bob', 'Janice');
network.addFriend('Alice', 'Charlie');
network.addFriend('Charlie', 'David');
network.addFriend('David', 'Eve');
network.addFriend('Eve', 'Frank');
network.addFriend('Alice', 'George');

// Finding friends of Alice and Bob
console.log('Friends of Alice:', network.getFriends('Alice'));
console.log('Friends of Bob:', network.getFriends('Bob'));

// Finding common friends of Alice and Bob
console.log('Common friends of Alice and Bob:', network.getCommonFriends('Alice', 'Bob'));

// Finding connection level
console.log('Connection level between Alice and Janice:', network.findConnectionLevel('Alice', 'Janice'));
console.log('Connection level between Alice and Bob:', network.findConnectionLevel('Alice', 'Bob'));
console.log('Connection level between Alice and Frank:', network.findConnectionLevel('Alice', 'Frank'));

/*
Time and Space Complexity Analysis:

1. getFriends(person):
   - Time Complexity: O(1)
     - Accessing the set of friends for a person takes O(1) time.
   - Space Complexity: O(F) where F is the number of friends the person has.
     - Storing the array of friends takes space proportional to the number of friends.

2. getCommonFriends(person1, person2):
   - Time Complexity: O(F1 + F2) where F1 is the number of friends of person1 and F2 is the number of friends of person2.
     - Iterating through each friend set takes O(F1) and O(F2) time respectively.
   - Space Complexity: O(C) where C is the number of common friends.
     - Storing the array of common friends takes space proportional to the number of common friends.

3. findConnectionLevel(person1, person2):
   - Time Complexity: O(N + E) where N is the number of nodes (persons) and E is the number of edges (friend connections).
     - Breadth-First Search (BFS) explores each node and edge once.
   - Space Complexity: O(N) where N is the number of nodes.
     - Storing the queue and visited set requires space proportional to the number of nodes.

Overall, the algorithms are efficient for typical social network graphs with relatively sparse connections compared to the number of users.
*/
