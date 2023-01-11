%** @rule(labels=ToTest) **%
a(X) :- b(X).

%** @rule(labels=ToTest) **%
c(X) | d(X) :- a(X).

%** @rule(labels=ToTest) **%
:-c(1).

%**@test{
	"name" : "checkConstr",
	"scope" : [ "ToTest" ],
	"input" : "a(1)",
	"assert" : [
	"@constraintInAll{ 'constraints': ':- c(1). :-c(1), d(2).' }"
	],
	"file" : "assets/input3.asp"
	}
**%

