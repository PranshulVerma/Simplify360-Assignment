class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
        this.dependencies = [];
        this.EST = 0; // Earliest Start Time
        this.EFT = 0; // Earliest Finish Time
        this.LST = Infinity; // Latest Start Time
        this.LFT = Infinity; // Latest Finish Time
    }

    addDependency(task) {
        this.dependencies.push(task);
    }
}

function calculateESTandEFT(tasks) {
    for (const task of tasks) {
        let maxEFT = 0;
        for (const dependency of task.dependencies) {
            maxEFT = Math.max(maxEFT, dependency.EFT);
        }
        task.EST = maxEFT;
        task.EFT = task.EST + task.duration;
    }
}

function calculateLSTandLFT(tasks, projectCompletionTime) {
    // Setting LFT of the final task(s) to project completion time
    for (const task of tasks) {
        if (!tasks.some(t => t.dependencies.includes(task))) {
            task.LFT = projectCompletionTime;
            task.LST = task.LFT - task.duration;
        }
    }

    for (let i = tasks.length - 1; i >= 0; i--) {
        const task = tasks[i];
        let minLST = Infinity;
        for (const t of tasks) {
            if (t.dependencies.includes(task)) {
                minLST = Math.min(minLST, t.LST);
            }
        }
        if (minLST < Infinity) {
            task.LFT = minLST;
            task.LST = task.LFT - task.duration;
        }
    }
}

// Example usage
const T_START = new Task("T_START", 0);
const taskA = new Task("A", 3);
const taskB = new Task("B", 2);
const taskC = new Task("C", 4);
const taskD = new Task("D", 1);

// Define dependencies
taskA.addDependency(T_START);
taskB.addDependency(T_START);
taskC.addDependency(taskA);
taskC.addDependency(taskB);
taskD.addDependency(taskC);

// List of all tasks
const tasks = [T_START, taskA, taskB, taskC, taskD];

// Calculate EST and EFT
calculateESTandEFT(tasks);

// Find project completion time (max EFT of all tasks)
const projectCompletionTime = Math.max(...tasks.map(task => task.EFT));

// Calculate LST and LFT
calculateLSTandLFT(tasks, projectCompletionTime);

console.log("Earliest time all tasks will be completed:", projectCompletionTime);
console.log("Latest time all tasks will be completed:", Math.max(...tasks.map(task => task.LFT)));

// Display task timings
tasks.forEach(task => {
    console.log(`Task ${task.name}: EST=${task.EST}, EFT=${task.EFT}, LST=${task.LST}, LFT=${task.LFT}`);
});
