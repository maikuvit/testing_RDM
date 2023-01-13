node(1). node(2). node(3).
edge(1,2). edge(1,3). edge(2,3).

col(X,red) | col(X,blue) | col(X,green) :- node(X).

:- edge(X, Y), col(X,C), col(Y,C).
