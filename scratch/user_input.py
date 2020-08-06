import timeit


with_pow = """\
s = random.random()
area = pow(s, 3)
"""

manual = """\
s = random.random()
area = s * s * s
"""

star = """\
s = random.random()
area = s ** 3
"""

print(f"POW: {timeit.timeit(stmt=with_pow, number=10000, setup='import random')}")
print(f"MANUAL: {timeit.timeit(stmt=manual, number=10000, setup='import random')}")
print(f"STAR: {timeit.timeit(stmt=star, number=10000, setup='import random')}")
