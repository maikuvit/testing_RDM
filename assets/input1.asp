%** Test graph **%
node(1). node(2). node(3).
edge(1,2). edge(1,3). edge(2,3).

%** @block(name="ToTest") **%
%** @rule(name="r1", block="ToTest") **%
col(X,red) | col(X,blue) | col(X,green) :- node(X).

%** @rule(name="r2", block="ToTest") **%
:- edge(X, Y), col(X,C), col(Y,C).

%** @rule(name="r3", block="ToTest") **%
:- col(X, red), node(X). 

%**@test("name" : "checkRules",
	"scope" : [ "r1","r2","r3" ],
	"input" : "node(1). node(2). node(3). edge(1,2). edge(1,3). edge(2,3).",
	"assert" : [
		"@noAnswerSet{}"  
	]
   )
**%