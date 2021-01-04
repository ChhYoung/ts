function my_cons(obj, list) {
    return {
        obj: obj,
        list: list
    }
}

function my_next(n) {
    return function(x) {
        return (x+n/x)/2
    }
}

function my_map(f) {
    return my_foldr(my_dot(my_cons, f), null)
}

function my_foldr(f, x) {
    return function(list) {
        if (list == null) {
            return x
        }
        return f(list.obj, my_foldr(f, x)(list.list))
    }
}

function my_dot(f1, f2) {
    return function(el, list){
        return f1(f2(el), list)
    }
}


function my_repeat(f, a, depth) {
    if (depth >= 100) {
        return my_cons(a, null)
    }
    return my_cons(a, my_repeat(f, f(a), depth+1))
}

function within(eps, aandb) {
    if (aandb.list == null || Math.abs(aandb.obj - aandb.list.obj) <= eps)  {
        return aandb.obj
    }
    return within(eps, aandb.list)
}

function sqrt(a0, eps, n) {
    return within(eps, my_repeat(my_next(n), a0, 0))
}


function easydiff(f, x) {
    return function(h) {
        return (f(x+h)-f(x))/h
    }
}

function differentiate(h0, f, x) {
    return my_map(easydiff(f, x))(my_repeat(halve, h0, 0))
}

function halve(x) {
    return x/2
}

function xplus1(x) {
    return x+1
}

function square(x) {
    return x*x
}


console.log("sqrt(2, 1, 4)")
console.log(sqrt(2, 0.01, 10))
console.log()
console.log("within(0.01, differentiate(1, xplus1, 1))")
console.log(within(0.01, differentiate(1, xplus1, 1)))
console.log()
console.log("within(0.01, differentiate(1, square, 1))")
console.log(within(0.01, differentiate(1, square, 1)))
console.log()
