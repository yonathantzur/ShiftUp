from __future__ import division
from __future__ import print_function
import math
import sys
from ortools.sat.python import cp_model


def main():
    # This program tries to find an optimal assignment of workers to shifts
    # Each worker can request to be assigned to specific shifts.
    # The optimal assignment maximizes the number of fulfilled shift requests.
    shift_requests = eval(sys.argv[1])
    num_workers = len(shift_requests)
    num_days = len(shift_requests[0])
    num_shifts = len(shift_requests[0][0])
    workers_per_shift = eval(sys.argv[2])
    day_workers_amount = sum(workers_per_shift)
    all_workers = range(num_workers)
    all_shifts = range(num_shifts)
    all_days = range(num_days)

    # Creates the model.
    model = cp_model.CpModel()

    # Creates shift variables.
    # shifts[(n, d, s)]: worker 'n' works shift 's' on day 'd'.
    shifts = {}
    for n in all_workers:
        for d in all_days:
            for s in all_shifts:
                shifts[(n, d, s)] = model.NewBoolVar('shift_n%id%is%i' % (n, d,
                                                                          s))

    # Each shift is assigned to exactly its needed workers number.
    for d in all_days:
        count = 0
        for s in all_shifts:
            model.Add(sum(shifts[(n, d, s)]
                          for n in all_workers) == workers_per_shift[count])
            count = count + 1

    # Each worker works at most worker_max_shifts_per_day shift per day.
    worker_max_shifts_per_day = math.ceil(day_workers_amount / num_workers)
    for n in all_workers:
        for d in all_days:
            model.Add(sum(shifts[(n, d, s)]
                          for s in all_shifts) <= worker_max_shifts_per_day)

    # min_shifts_assigned is the largest integer such that every worker can be
    # assigned at least that number of shifts.
    min_shifts_per_worker = (day_workers_amount * num_days) // num_workers
    max_shifts_per_worker = min_shifts_per_worker + 1
    for n in all_workers:
        num_shifts_worked = sum(
            shifts[(n, d, s)] for d in all_days for s in all_shifts)
        model.Add(min_shifts_per_worker <= num_shifts_worked)
        model.Add(num_shifts_worked <= max_shifts_per_worker)

    model.Maximize(
        sum(shift_requests[n][d][s] * shifts[(n, d, s)] for n in all_workers
            for d in all_days for s in all_shifts))
    # Creates the solver and solve.
    solver = cp_model.CpSolver()
    solver.Solve(model)

    result = []

    for n in all_workers:
        days = []
        for d in all_days:
            shifts_assign = []
            for s in all_shifts:
                shifts_assign.append(solver.Value(shifts[(n, d, s)]))
            days.append(shifts_assign)
        result.append(days)

    print(result)


if __name__ == '__main__':
    main()
