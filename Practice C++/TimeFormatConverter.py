#!/bin/python3

import math
import os
import random
import re
import sys

#
# Complete the 'timeConversion' function below.
#
# The function is expected to return a STRING.
# The function accepts STRING s as parameter.
#

def timeConversion(s):
    Leng=len(s)
    ans=""
    if(s[Leng-2]=="A"):
        if s[0:2]=="12":
            ans="00"+s[2:Leng-2]
        else:
            ans=s[0:Leng-2]
    else:
        Hour=s[0:2]
        if s[0:2]=="12":
            Hour=12
        else:
            Hour=int(Hour)+12
        ans=str(Hour)+s[2:Leng-2]
    return ans

    # Write your code here

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    s = input()

    result = timeConversion(s)

    fptr.write(result + '\n')

    fptr.close()

