# -*- coding: utf-8 -*-
"""
Created on Wed Feb  9 19:13:50 2022

@author: batte
"""

import itertools

printResults = True
printCount = False
count = 0

# all combinaitons of operations
operationPossibilities = []
allResults = []
for first in "+-*/":
    for second in "+-*/":
        for third in "+-*/":
            operationPossibilities.append(first+second+third)

def sequence_works(numSequence, goals):
    global count

    remainingGoals = goals.copy()
    results = []

    for perm in itertools.permutations(numSequence):
        A,B,C,D = perm
        
        parenthesesPossibilities = """AB.C.D,C.AB.D,C.D.AB,(AB.C).D,AB.(C.D),(C.AB).D,C.(AB.D),(C.D).AB,C.(D.AB),AB.CD,A.B.C.D,(A.B).C.D,A.(B.C).D,A.B.(C.D),(A.B.C).D,A.(B.C.D),(A.B).(C.D),((A.B).C).D,(A.(B.C)).D,A.((B.C).D),A.(B.(C.D))"""\
            .replace("A",A).replace("B",B).replace("C",C).replace("D",D).split(",")  # . is opperation filler
                    
        
        for parentheses in parenthesesPossibilities:
            for operations in operationPossibilities:
                newEquation = parentheses[:]
                i = 0
                for index in range(len(parentheses)):
                    if parentheses[index] == ".":
                        newEquation = newEquation[:index] + operations[i] + newEquation[index+1:]
                        i += 1
                        
                try:
                    solution = eval(newEquation)
                except ZeroDivisionError:
                    solution = None
                
                if solution in remainingGoals:
                    remainingGoals.remove(solution)
                    results.append('\t"' + str(int(solution)) + '": "' + str(newEquation) + '"')
                    if len(remainingGoals) == 0:
                        if printResults:
                            allResults.append(
                                ('"' + numSequence + '": {\n' +
                                ',\n'.join(results) +'\n}')
                            )
                        if printCount:
                            count += 1
                        return True
            
    return False


alreadyBeenTried = []
lstOfWorking = []
for i in range(1,10000):
    iString = "0"*(4-len(str(i))) + str(i)
        
    if "".join(sorted(iString)) in alreadyBeenTried or "0" in iString:
        continue
        
    alreadyBeenTried.append(iString)
    if sequence_works(iString, list(range(1,11))):
        lstOfWorking.append(iString)

if printResults:
    print("{")
    print(',\n'.join(allResults))
    print("}")
if printCount:
    print(count)