// compiled by ocamlc 3.10.2, ocamljs 0.2
var ocamljs$caml_named_value = (function (){
var Match_failure$16g = "Match_failure";
var Out_of_memory$17g = "Out_of_memory";
var Stack_overflow$24g = "Stack_overflow";
var Invalid_argument$18g = "Invalid_argument";
var Failure$19g = "Failure";
var Not_found$20g = "Not_found";
var Sys_error$21g = "Sys_error";
var End_of_file$22g = "End_of_file";
var Division_by_zero$23g = "Division_by_zero";
var Sys_blocked_io$25g = "Sys_blocked_io";
var Assert_failure$26g = "Assert_failure";
var Undefined_recursive_module$27g = "Undefined_recursive_module";
/*
 * This file is part of ocamljs, OCaml to Javascript compiler
 * Copyright (C) 2007-9 Skydeck, Inc
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Library General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Library General Public License for more details.
 *
 * You should have received a copy of the GNU Library General Public
 * License along with this library; if not, write to the Free
 * Software Foundation, Inc., 59 Temple Place - Suite 330, Boston,
 * MA 02111-1307, USA
 */

var caml_blit_string = function (s1, o1, s2, o2, n) {
  for (var i = 0; i < n; i++)
    oc$$ssetu(s2, o2 + i, oc$$srefu(s1, o1 + i));
}
var caml_callback = function (f, a) { return _(f, [a]); }
var caml_callback2 = function (f, a1, a2) { return _(f, [a1, a2]); }
var caml_callback3 = function (f, a1, a2, a3) { return _(f, [a1, a2, a3]); }
var caml_callback4 = function (f, a1, a2, a3, a4) { return _(f, [a1, a2, a3, a4]); }
var caml_callback5 = function (f, a1, a2, a3, a4, a5) { return _(f, [a1, a2, a3, a4, a5]); }
var caml_callbackN = function (f, n, args) { return _(f, args); }
// XXX caml_callback_exn ?
var compare_val = function (v1, v2, total) {
  var LESS = -1;
  var GREATER = 1;
  var EQUAL = 0;
  var UNORDERED = -2; // XXX ok?

  // XXX needs some work

  if (v1 == v2 && total) return EQUAL;

  var t1 = typeof v1;
  var t2 = typeof v2;
  if (t1 == t2) {
    switch (t1) {
    case "boolean":
      if (v1 < v2) return LESS;
      if (v1 > v2) return GREATER;
      return EQUAL;
    case "number":
      if (v1 < v2) return LESS;
      if (v1 > v2) return GREATER;
      if (v1 != v2) {
	if (!total) return UNORDERED;
	if (v1 == v1) return GREATER;
	if (v2 == v2) return LESS;
	return EQUAL;
      }
      return EQUAL;
    case "string":
      if (v1 < v2) return LESS;
      if (v1 > v2) return GREATER;
      return EQUAL;
    case "function":
      caml_invalid_argument("equal: functional value");
    case "object":
      // like NaN
      if (v1 == null) {
	if (v2 == null) return EQUAL;
	return LESS;
      }
      if (v2 == null) return GREATER;

      // XXX is there a way to get the class of an object as a value?
      // XXX is it worth special casing various JS objects?
      if (v1 instanceof Date) {
	var t1 = v1.getTime();
	var t2 = v2.getTime();
	if (t1 < t2) return LESS;
	if (t1 > t2) return GREATER;
	return EQUAL;
      }
      if (v1 instanceof Array) {
	// we should always either have both tags or neither
	// so it is OK to fall through here
	if (v1.t < v2.t) return LESS;
	if (v1.t > v2.t) return GREATER;
	var sz1 = v1.length;
	var sz2 = v2.length;
	if (sz1 < sz2) return LESS;
	if (sz1 > sz2) return GREATER;
	if (sz1 == 0) return EQUAL;
	for (var i=0; i < sz1; i++)
	  {
	    var c = compare_val(v1[i], v2[i], total);
	    if (c != EQUAL) return c;
	  }
	return EQUAL;
      }
      if (v1 instanceof oc$$ms) {
	var s1 = v1.toString();
	var s2 = v2.toString();
	if (s1 < s2) return LESS;
	if (s1 > s2) return GREATER;
	return EQUAL;
      }
      return UNORDERED; // XXX
    default:
      return UNORDERED;
    }
  }

  // like NaN
  if (v1 == null) {
    if (v2 == null) return EQUAL;
    return LESS;
  }
  if (v2 == null) return GREATER;

  // one boolean and one int
  if (t1 == "boolean" || t2 == "boolean")
  {
    if (v1 < v2) return LESS;
    if (v1 > v2) return GREATER;
    return EQUAL;
  }
  // one mutable and one immutable string
  if (t1 == "string" || t2 == "string")
  {
    var s1 = v1.toString();
    var s2 = v2.toString();
    if (s1 < s2) return LESS;
    if (s1 > s2) return GREATER;
    return EQUAL;
  }
  // one constructor without data (number) and one with (object Array)
  if (t1 == "number") return LESS;
  if (t2 == "number") return GREATER;
  return UNORDERED;
}
var caml_compare = function (v1, v2) {
  var res = compare_val(v1, v2, 1);
  return res < 0 ? -1 : res > 0 ? 1 : 0;
}
var caml_equal = function (v1, v2) { return compare_val(v1, v2, 0) == 0; }
var caml_failwith = function (s) { throw $(Failure$19g, s); }
var caml_fill_string = function(s, o, l, c) {
  for (var i = 0; i < l; i++)
    oc$$ssetu(s, o + i, c);
}
var caml_float_of_string = function (s) {
  var f = parseFloat(s);
  return isNaN(f) ? caml_failwith("float_of_string") : f;
}

var caml_format_int = function(f, a) {
  function parse_format(f) { return f; } // XXX see ints.c
  var f2 = parse_format(f);
  return oc$$sprintf(f2, a);
}

var caml_greaterthan = function (v1, v2) { return compare_val(v1, v2, 0) > 0; }
var caml_greaterequal = function (v1, v2) { return compare_val(v1, v2, 0) >= 0; }
var caml_input_value = function () { throw "caml_input_value"; }
var caml_input_value_from_string = function () { throw "caml_input_value_from_string"; }
var caml_install_signal_handler = function () { throw "caml_install_signal_handler"; }
var caml_int32_compare = function (i1, i2) { return (i1 > i2) - (i1 < i2); }
var caml_int64_compare = function (i1, i2) { throw "caml_int64_compare"; }
var caml_int64_float_of_bits = function (s) {
  // see pervasives.ml; int64s are represented by strings
  switch (s) {
  case "9218868437227405312": return Number.POSITIVE_INFINITY;
  case "-4503599627370496": return Number.NEGATIVE_INFINITY;
  case "9218868437227405313": return Number.NaN;
  case "9218868437227405311" : return Number.MAX_VALUE;
  case "4503599627370496": return Number.MIN_VALUE;
  case "4372995238176751616": return 0; // XXX how to get epsilon in js?
  default: return 0;
  }
}
var caml_int_of_string = function (s) {
  var i = parseInt(s, 10);
  return isNaN(i) ? caml_failwith("int_of_string") : i;
}
var caml_invalid_argument = function (s) { throw $(Invalid_argument$18g, s); }
var caml_is_printable = function (c) { return c > 21 && c < 127; } // XXX get this right
var caml_lessthan = function (v1, v2) { return compare_val(v1, v2, 0) -1 < -1; }
var caml_lessequal = function (v1, v2) { return compare_val(v1, v2, 0) -1 <= -1; }
var caml_make_vect = function (l, i) {
  var a = new Array(l);
  for (var j = 0; j < l; j++)
    a[j] = i;
  return a;
}
var caml_marshal_data_size = function () { throw "caml_marshal_data_size"; }
var caml_md5_chan = function () { throw "caml_md5_chan"; }
var caml_md5_string = function () { throw "caml_md5_string"; }
var caml_ml_channel_size = function () { throw "caml_ml_channel_size"; }
var caml_ml_channel_size_64 = function () { throw "caml_ml_channel_size_64"; }
var caml_ml_close_channel = function () { throw "caml_ml_close_channel"; }

// see print_endline hack below
var caml_ml_flush = function (c) { }

var caml_ml_input = function () { throw "caml_ml_input"; }
var caml_ml_input_char = function () { throw "caml_ml_input_char"; }
var caml_ml_input_int = function () { throw "caml_ml_input_int"; }
var caml_ml_input_scan_line = function () { throw "caml_ml_input_scan_line"; }
var caml_ml_open_descriptor_in = function () { return 0; } // XXX
var caml_ml_open_descriptor_out = function () { return 0; } // XXX
var caml_ml_out_channels_list = function () { return 0; }

// this is a hack to make print_endline work in the standalone js
// interpreter for running tests
var caml_ml_output = function (c, b, s, l) { print(b); }
var caml_ml_output_char = function (c, ch) {  }

var caml_ml_output_int = function () { throw "caml_ml_output_int"; }
var caml_ml_pos_in = function () { throw "caml_ml_pos_in"; }
var caml_ml_pos_in_64 = function () { throw "caml_ml_pos_in_64"; }
var caml_ml_pos_out = function () { throw "caml_ml_pos_out"; }
var caml_ml_pos_out_64 = function () { throw "caml_ml_pos_out_64"; }
var caml_ml_seek_in = function () { throw "caml_ml_seek_in"; }
var caml_ml_seek_in_64 = function () { throw "caml_ml_seek_in_64"; }
var caml_ml_seek_out = function () { throw "caml_ml_seek_out"; }
var caml_ml_seek_out_64 = function () { throw "caml_ml_seek_out_64"; }
var caml_ml_set_binary_mode = function () { throw "caml_ml_set_binary_mode"; }
var caml_named_value = function (n) { return oc$$nv[n]; }
var caml_nativeint_compare = function (i1, i2) { return (i1 > i2) - (i1 < i2); }
var caml_notequal = function (v1, v2) { return compare_val(v1, v2, 0) != 0; }
var caml_obj_dup = function (a) {
  var l = a.length;
  var d = new Array(l);
  for (var i=0; i < l; i++)
    d[i] = a[i];
  d.t = a.t;
  return d;
}
var caml_obj_is_block = function (o) { return !(typeof o == 'number') }
var caml_obj_tag = function(o) { return o.t; }
var caml_obj_set_tag = function(o, t) { o.$t = t; }
var caml_obj_block = function(t, s) { if (s == 0) return t; else { var a = new Array(s); a.$t = t; return a; } }
var caml_obj_truncate = function(o, s) { o.length = s; }
var caml_output_value = function () { throw "caml_output_value"; }
var caml_output_value_to_string = function () { throw "caml_output_value_to_string"; }
var caml_output_value_to_buffer = function () { throw "caml_output_value_to_buffer"; }
var caml_register_named_value = function (n, v) { oc$$nv[n] = v; }
var caml_string_compare = function (s1, s2) {
  if (oc$$slt(s1, s2)) return -1;
  else if (oc$$sgt(s1, s2)) return 1;
  else return 0;
}
var caml_sys_exit = function () { throw "caml_sys_exit"; }
  var init_time = (new Date()).getTime() / 1000;
var caml_sys_time = function () { return (new Date()).getTime() / 1000 - init_time; }
var caml_sys_get_argv = function () { return $("", $()); } // XXX put something here?
var caml_sys_get_config = function () { return $("js", 32); } // XXX browser name?
var caml_sys_open = function () { throw "caml_sys_open"; }
var caml_sys_random_seed = function() { throw "caml_sys_random_seed"; }
/*
 * This file is part of ocamljs, OCaml to Javascript compiler
 * Copyright (C) 2007-9 Skydeck, Inc
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Library General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Library General Public License for more details.
 *
 * You should have received a copy of the GNU Library General Public
 * License along with this library; if not, write to the Free
 * Software Foundation, Inc., 59 Temple Place - Suite 330, Boston,
 * MA 02111-1307, USA
 */

/*
function console_log(s) {
  var cs = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces["nsIConsoleService"]);
  cs.logStringMessage(s);
}
*/

var oc$$nv = {}

// XXX name these sensibly and compactify code afterwards

function ___m(m, t, a)
{
  function ap(a1, a2) {
    var a = new Array();
    for (var i=0; i < a1.length; i++) a.push(a1[i]);
    for (var i=0; i < a2.length; i++) a.push(a2[i]);
    return a;
  }

  while (true) {
    // non-ocamljs functions can't be under/over-applied
    if (!m.$oc)
      return m.apply(t, a);

    var al = a.length;
    var ml = m.length;

    if (al < ml)
    {
      switch (ml - al) {
      case 1: return _f(function (z) { return m.apply(t, ap(a, arguments)) });
      case 2: return _f(function (z,y) { return m.apply(t, ap(a, arguments)) });
      case 3: return _f(function (z,y,x) { return m.apply(t, ap(a, arguments)) });
      case 4: return _f(function (z,y,x,w) { return m.apply(t, ap(a, arguments)) });
      case 5: return _f(function (z,y,x,w,v) { return m.apply(t, ap(a, arguments)) });
      case 6: return _f(function (z,y,x,w,v,u) { return m.apply(t, ap(a, arguments)) });
      case 7: return _f(function (z,y,x,w,v,u,s) { return m.apply(t, ap(a, arguments)) });
      default: throw "unimplemented";
      }
    }
    else if (al == ml)
      return m.apply(t, a);
    else // al > ml
    {
      m = _m(m, t, a.slice(0, ml));
      t = m;
      a = a.slice(ml);
    }
  }
}

/*@cc_on @if (@_win32 && @_jscript_version >= 5)
function ___m(m, t, a)
{
  function ap(a1, a2) {
    var a = new Array();
    for (var i=0; i < a1.length; i++) a.push(a1[i]);
    for (var i=0; i < a2.length; i++) a.push(a2[i]);
    return a;
  }

  while (true) {
    // non-ocamljs functions can't be under/over-applied
    if (!m.$oc) {
      if (m.apply)
        return m.apply(t, a);
      else
        // IE < 8 doesn't support apply for DOM methods, but does support "cached" methods bound to an object
        switch (a.length) {
        case 0: return m();
        case 1: return m(a[0]);
        case 2: return m(a[0], a[1]);
        case 3: return m(a[0], a[1], a[2]);
        case 4: return m(a[0], a[1], a[2], a[3]);
        case 5: return m(a[0], a[1], a[2], a[3], a[4]);
        case 6: return m(a[0], a[1], a[2], a[3], a[4], a[5]);
        case 7: return m(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
        default: throw "unimplemented";
        }
    }

    var al = a.length;
    var ml = m.length;

    if (al < ml)
    {
      switch (ml - al) {
      case 1: return _f(function (z) { return m.apply(t, ap(a, arguments)) });
      case 2: return _f(function (z,y) { return m.apply(t, ap(a, arguments)) });
      case 3: return _f(function (z,y,x) { return m.apply(t, ap(a, arguments)) });
      case 4: return _f(function (z,y,x,w) { return m.apply(t, ap(a, arguments)) });
      case 5: return _f(function (z,y,x,w,v) { return m.apply(t, ap(a, arguments)) });
      case 6: return _f(function (z,y,x,w,v,u) { return m.apply(t, ap(a, arguments)) });
      case 7: return _f(function (z,y,x,w,v,u,s) { return m.apply(t, ap(a, arguments)) });
      default: throw "unimplemented";
      }
    }
    else if (al == ml)
      return m.apply(t, a);
    else // al > ml
    {
      m = _m(m, t, a.slice(0, ml));
      t = m;
      a = a.slice(ml);
    }
  }
}
@end @*/

// tail call
function __m(m, t, args)
{
  args.$m = m;
  args.$t = t;
  args.$tr = true;
  return args;
}
function __(t, args) { return __m(t, t, args); }

// non tail call
function _m(m, t, args)
{
  var v = __m(m, t, args);
  while (v && v.$tr)
    v = ___m(v.$m, v.$t, v);
  return v;
}
function _(t, args) { return _m(t, t, args); }

function _f(f) {
  f.$oc = true;
  return f;
}

function $N(t, a) {
  var l = a.length;
  var b = new Array(l);
  for (var i=0; i < l; i++)
    b[i] = a[i];
  b.t = t;
  return b;
}
function $() { return $N(0, arguments); }
function $1() { return $N(1, arguments); }
function $2() { return $N(2, arguments); }
function $3() { return $N(3, arguments); }
function $4() { return $N(4, arguments); }
function $5() { return $N(5, arguments); }
function $6() { return $N(6, arguments); }
function $7() { return $N(7, arguments); }
function $8() { return $N(8, arguments); }
function $9() { return $N(9, arguments); }
function $t(a) { return a.t; }

function $xM(t) { return { $t: t }; }
function $xN(t, a) { a.$t = t; return a; }
function $xt(a) { return a.$t; }

function oc$$arefs(o, i) {
  return i < o.length ? o[i] : oc$Pervasives$[0]("index out of bounds");
}
function oc$$asets(o, i, v) {
  return i < o.length ? o[i] = v : oc$Pervasives$[0]("index out of bounds");
}

// mutable strings, argh

function oc$$ms(a) {
  this.a = a;
  this.length = a.length;
}

// XXX cache the string rep?
oc$$ms.prototype.toString = function () { return String.fromCharCode.apply(null, this.a); }

function oc$$lms(s) {
  var l = s.length;
  var a = new Array(l);
  for (var i = 0; i < l; i++)
    a[i] = s.charCodeAt(i);
  return new oc$$ms(a);
}
function oc$$cms(n) {
  return new oc$$ms(new Array(n));
}
function oc$$srefu(o, i) { return typeof o == "string" ? o.charCodeAt(i) : o.a[i]; }
function oc$$ssetu(o, i, v) { o.a[i] = v; }
function oc$$srefs(o, i) {
  return i < o.length ? oc$$srefu(o, i) : oc$Pervasives$[0]("index out of bounds");
}
function oc$$ssets(o, i, v) {
  return i < o.length ? oc$$ssetu(o, i, v) : oc$Pervasives$[0]("index out of bounds");
}

function oc$$seq(s1, s2) { return s1.toString() == s2.toString(); }
function oc$$sneq(s1, s2) { return s1.toString() != s2.toString(); }
function oc$$slt(s1, s2) { return s1.toString() < s2.toString(); }
function oc$$sgt(s1, s2) { return s1.toString() > s2.toString(); }
function oc$$slte(s1, s2) { return s1.toString() <= s2.toString(); }
function oc$$sgte(s1, s2) { return s1.toString() >= s2.toString(); }

/*
**  sprintf.js -- POSIX sprintf(3) style formatting function for JavaScript
**  Copyright (c) 2006-2007 Ralf S. Engelschall <rse@engelschall.com>
**  Partly based on Public Domain code by Jan Moesen <http://jan.moesen.nu/>
**  Licensed under GPL <http://www.gnu.org/licenses/gpl.txt>
**
**  modified for ocamljs to more closely match Linux
**
**  $LastChangedDate$
**  $LastChangedRevision$
*/

/*  make sure the ECMAScript 3.0 Number.toFixed() method is available  */
if (typeof Number.prototype.toFixed != "undefined") {
    (function(){
        /*  see http://www.jibbering.com/faq/#FAQ4_6 for details  */
        function Stretch(Q, L, c) {
            var S = Q
            if (c.length > 0)
                while (S.length < L)
                    S = c+S;
            return S;
        }
        function StrU(X, M, N) { /* X >= 0.0 */
            var T, S;
            S = new String(Math.round(X * Number("1e"+N)));
            if (S.search && S.search(/\D/) != -1)
                return ''+X;
            with (new String(Stretch(S, M+N, '0')))
                return substring(0, T=(length-N)) + '.' + substring(T);
        }
        function Sign(X) {
            return X < 0 ? '-' : '';
        }
        function StrS(X, M, N) {
            return Sign(X)+StrU(Math.abs(X), M, N);
        }
        Number.prototype.toFixed = function (n) { return StrS(this, 1, n) };
    })();
}

/*  the sprintf() function  */
var oc$$sprintf = function () {
    /*  argument sanity checking  */
    if (!arguments || arguments.length < 1)
        alert("sprintf:ERROR: not enough arguments 1");

    /*  initialize processing queue  */
    var argumentnum = 0;
    var done = "", todo = arguments[argumentnum++];

    /*  parse still to be done format string  */
    var m;
    while ((m = /^([^%]*)%(\d+$)?([#0 +'-]+)?(\*|\d+)?(\.\*|\.\d+)?([%dioulLnNxXfFgGcs])(.*)$/.exec(todo))) {
        var pProlog    = m[1],
            pAccess    = m[2],
            pFlags     = m[3],
            pMinLength = m[4],
            pPrecision = m[5],
            pType      = m[6],
            pEpilog    = m[7];

        /*  determine substitution  */
        var subst;
        if (pType == '%')
            /*  special case: escaped percent character  */
            subst = '%';
        else {
            /*  parse padding and justify aspects of flags  */
            var padWith = ' ';
            var justifyRight = true;
            if (pFlags) {
                if (pFlags.indexOf('0') >= 0)
                    padWith = '0';
                if (pFlags.indexOf('-') >= 0) {
                    padWith = ' ';
                    justifyRight = false;
                }
            }
            else
                pFlags = "";

            /*  determine minimum length  */
            var minLength = -1;
            if (pMinLength) {
                if (pMinLength == "*") {
                    var access = argumentnum++;
                    if (access >= arguments.length)
                        alert("sprintf:ERROR: not enough arguments 2");
                    minLength = arguments[access];
                }
                else
                    minLength = parseInt(pMinLength, 10);
            }

            /*  determine precision  */
            var precision = -1;
            if (pPrecision) {
                if (pPrecision == ".*") {
                    var access = argumentnum++;
                    if (access >= arguments.length)
                        alert("sprintf:ERROR: not enough arguments 3");
                    precision = arguments[access];
                }
                else
                    precision = parseInt(pPrecision.substring(1), 10);
            }

            /*  determine how to fetch argument  */
            var access = argumentnum++;
            if (pAccess)
                access = parseInt(pAccess.substring(0, pAccess.length - 1), 10);
            if (access >= arguments.length)
                alert("sprintf:ERROR: not enough arguments 4");

            /*  dispatch into expansions according to type  */
            var prefix = "";
            switch (pType) {
                case 'd':
                case 'i':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0;
                    subst = subst.toString(10);
                    if (pFlags.indexOf('#') >= 0 && subst >= 0)
                        subst = "+" + subst;
                    if (pFlags.indexOf(' ') >= 0 && subst >= 0)
                        subst = " " + subst;
                    break;
                case 'o':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0;
                    subst = subst.toString(8);
                    break;
                case 'u':
                case 'l':
                case 'L':
                case 'n':
                case 'N':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0;
                    subst = Math.abs(subst);
                    subst = subst.toString(10);
                    break;
                case 'x':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0;
                    subst = subst.toString(16).toLowerCase();
                    if (pFlags.indexOf('#') >= 0)
                        prefix = "0x";
                    break;
                case 'X':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0;
                    subst = subst.toString(16).toUpperCase();
                    if (pFlags.indexOf('#') >= 0)
                        prefix = "0X";
                    break;
                case 'f':
                case 'F':
                case 'g':
                case 'G':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0.0;
                    subst = 0.0 + subst;
                    if (precision > -1) {
                        if (subst.toFixed)
                            subst = subst.toFixed(precision);
                        else {
                            subst = (Math.round(subst * Math.pow(10, precision)) / Math.pow(10, precision));
                            subst += "0000000000";
                            subst = subst.substr(0, subst.indexOf(".")+precision+1);
                        }
                    }
                    subst = '' + subst;
                    if (pFlags.indexOf("'") >= 0) {
                        var k = 0;
                        for (var i = (subst.length - 1) - 3; i >= 0; i -= 3) {
                            subst = subst.substring(0, i) + (k == 0 ? "." : ",") + subst.substring(i);
                            k = (k + 1) % 2;
                        }
                    }
                    subst = subst.replace('Infinity', 'inf');
                    subst = subst.replace('NaN', 'nan');
                    break;
                case 'c':
                    subst = arguments[access];
                    if (typeof subst != "number")
                        subst = 0;
                    subst = String.fromCharCode(subst);
                    break;
                case 's':
                    subst = arguments[access];
                    if (precision > -1)
                        subst = subst.substr(0, precision);
                    if (typeof subst != "string")
                        subst = "";
                    break;
            }

            /*  apply optional padding  */
            var padding = minLength - subst.toString().length - prefix.toString().length;
            if (padding > 0) {
                var arrTmp = new Array(padding + 1);
                if (justifyRight)
                    subst = arrTmp.join(padWith) + subst;
                else
                    subst = subst + arrTmp.join(padWith);
            }

            /*  add optional prefix  */
            subst = prefix + subst;
        }

        /*  update the processing queue  */
        done = done + pProlog + subst;
        todo = pEpilog;
    }
    return (done + todo);
};

/*@cc_on @if (@_win32 && @_jscript_version >= 5) if (!window.XMLHttpRequest)
window.XMLHttpRequest = function() { return new ActiveXObject('Microsoft.XMLHTTP') };
@end @*/
var oc$Pervasives$ =
  function () {
    var failwith$54 = _f(function (s$55) { throw $(Failure$19g, s$55); });
    var invalid_arg$56 = _f(function (s$57) { throw $(Invalid_argument$18g, s$57); });
    var Exit$58 = $("Pervasives.Exit");
    var min$66 = _f(function (x$67, y$68) { if (caml_lessequal(x$67, y$68)) return x$67;
                                            return y$68; });
    var max$69 = _f(function (x$70, y$71) { if (caml_greaterequal(x$70, y$71)) return x$70;
                                            return y$71; });
    var abs$87 = _f(function (x$88) { if (x$88 >= 0) return x$88;
                                      return -x$88; });
    var lnot$92 = _f(function (x$93) { return x$93 ^ -1; });
    var min_int$97 = 1 << (1 << 31 === 0 ? 30 : 62);
    var max_int$98 = min_int$97 - 1;
    var infinity$131 = caml_int64_float_of_bits("9218868437227405312");
    var neg_infinity$132 = caml_int64_float_of_bits("-4503599627370496");
    var nan$133 = caml_int64_float_of_bits("9218868437227405313");
    var max_float$134 = caml_int64_float_of_bits("9218868437227405311");
    var min_float$135 = caml_int64_float_of_bits("4503599627370496");
    var epsilon_float$136 = caml_int64_float_of_bits("4372995238176751616");
    var $5E$152 = _f(function (s1$153, s2$154) { return s1$153.toString() + s2$154.toString(); });
    var char_of_int$157 =
      _f(function (n$158) { if (n$158 < 0 || n$158 > 255) return __(invalid_arg$56, ["char_of_int"]);
                            return n$158; });
    var string_of_bool$164 = _f(function (b$165) { if (b$165) return "true";
                                                   return "false"; });
    var bool_of_string$166 =
      _f(function (param$428) {
           if (!oc$$sneq(param$428, "false")) return 0;
           if (oc$$sneq(param$428, "true")) return __(invalid_arg$56, ["bool_of_string"]);
           return 1;
         });
    var string_of_int$167 = _f(function (n$168) { return caml_format_int("%d", n$168); });
    var String$171 = $();
    var valid_float_lexem$172 =
      _f(function (s$173) {
           var l$174 = s$173.length;
           var loop$175 =
             _f(function (i$176) {
                  if (i$176 >= l$174) return __($5E$152, [s$173, "."]);
                  var match$427 = oc$$srefs(s$173, i$176);
                  var $r58 = false;
                  r$58: {
                    if (!(match$427 >= 48)) { if (!(match$427 !== 45)) { $r58 = true;
                                                                    break r$58; }
                                              return s$173; }
                    if (!(match$427 >= 58)) { $r58 = true;
                                              break r$58; }
                    return s$173;
                  }
                  if ($r58) return __(loop$175, [i$176 + 1]);
                });
           return __(loop$175, [0]);
         });
    var string_of_float$177 = _f(function (f$178) { return __(valid_float_lexem$172, [oc$$sprintf("%.12g", f$178)]); });
    var $40$180 =
      _f(function (l1$181, l2$182) { if (l1$181) return $(l1$181[0], _($40$180, [l1$181[1], l2$182]));
                                     return l2$182; });
    var stdin$189 = caml_ml_open_descriptor_in(0);
    var stdout$190 = caml_ml_open_descriptor_out(1);
    var stderr$191 = caml_ml_open_descriptor_out(2);
    var open_out_gen$212 =
      _f(function (mode$213, perm$214, name$215) {
           return caml_ml_open_descriptor_out(caml_sys_open(name$215, mode$213, perm$214));
         });
    var open_out$216 = _f(function (name$217) { return __(open_out_gen$212, [$(1, $(3, $(4, $(7, 0)))), 438, name$217]); });
    var open_out_bin$218 = _f(function (name$219) { return __(open_out_gen$212, [$(1, $(3, $(4, $(6, 0)))), 438, name$219]); });
    var flush_all$222 =
      _f(function (param$424) {
           var iter$223 =
             _f(function (param$425) {
                  if (param$425)
                  {
                    try { caml_ml_flush(param$425[0]); } catch (exn$426) { ; }
                    return __(iter$223, [param$425[1]]);
                  }
                  return 0;
                });
           return __(iter$223, [caml_ml_out_channels_list(0)]);
         });
    var output_string$228 = _f(function (oc$229, s$230) { return caml_ml_output(oc$229, s$230, 0, s$230.length); });
    var output$231 =
      _f(function (oc$232, s$233, ofs$234, len$235) {
           if (ofs$234 < 0 || (len$235 < 0 || ofs$234 > s$233.length - len$235)) return __(invalid_arg$56, ["output"]);
           return caml_ml_output(oc$232, s$233, ofs$234, len$235);
         });
    var output_value$239 = _f(function (chan$240, v$241) { return caml_output_value(chan$240, v$241, 0); });
    var close_out$246 = _f(function (oc$247) { caml_ml_flush(oc$247);
                                               return caml_ml_close_channel(oc$247); });
    var close_out_noerr$248 =
      _f(function (oc$249) {
           try { caml_ml_flush(oc$249); } catch (exn$423) { ; }
           try { return caml_ml_close_channel(oc$249); } catch (exn$422) { return 0; }
         });
    var open_in_gen$251 =
      _f(function (mode$252, perm$253, name$254) {
           return caml_ml_open_descriptor_in(caml_sys_open(name$254, mode$252, perm$253));
         });
    var open_in$255 = _f(function (name$256) { return __(open_in_gen$251, [$(0, $(7, 0)), 0, name$256]); });
    var open_in_bin$257 = _f(function (name$258) { return __(open_in_gen$251, [$(0, $(6, 0)), 0, name$258]); });
    var input$261 =
      _f(function (ic$262, s$263, ofs$264, len$265) {
           if (ofs$264 < 0 || (len$265 < 0 || ofs$264 > s$263.length - len$265)) return __(invalid_arg$56, ["input"]);
           return caml_ml_input(ic$262, s$263, ofs$264, len$265);
         });
    var unsafe_really_input$266 =
      _f(function (ic$267, s$268, ofs$269, len$270) {
           if (len$270 <= 0) return 0;
           var r$271 = caml_ml_input(ic$267, s$268, ofs$269, len$270);
           if (r$271 === 0) throw $(End_of_file$22g);
           return __(unsafe_really_input$266, [ic$267, s$268, ofs$269 + r$271, len$270 - r$271]);
         });
    var really_input$272 =
      _f(function (ic$273, s$274, ofs$275, len$276) {
           if (ofs$275 < 0 || (len$276 < 0 || ofs$275 > s$274.length - len$276)) return __(invalid_arg$56, ["really_input"]);
           return __(unsafe_really_input$266, [ic$273, s$274, ofs$275, len$276]);
         });
    var input_line$278 =
      _f(function (chan$279) {
           var build_result$280 =
             _f(function (buf$281, pos$282, param$421) {
                  if (param$421)
                  {
                    var hd$283 = param$421[0];
                    var len$285 = hd$283.length;
                    caml_blit_string(hd$283, 0, buf$281, pos$282 - len$285, len$285);
                    return __(build_result$280, [buf$281, pos$282 - len$285, param$421[1]]);
                  }
                  return buf$281;
                });
           var scan$286 =
             _f(function (accu$287, len$288) {
                  var n$289 = caml_ml_input_scan_line(chan$279);
                  if (!(n$289 === 0))
                  {
                    if (n$289 > 0)
                    {
                      var res$290 = oc$$cms(n$289 - 1);
                      caml_ml_input(chan$279, res$290, 0, n$289 - 1);
                      ;
                      caml_ml_input_char(chan$279);
                      ;
                      if (accu$287)
                      {
                        var len$291 = len$288 + n$289 - 1;
                        return __(build_result$280, [oc$$cms(len$291), len$291, $(res$290, accu$287)]);
                      }
                      return res$290;
                    }
                    var beg$292 = oc$$cms(-n$289);
                    caml_ml_input(chan$279, beg$292, 0, -n$289);
                    ;
                    return __(scan$286, [$(beg$292, accu$287), len$288 - n$289]);
                  }
                  if (accu$287) return __(build_result$280, [oc$$cms(len$288), len$288, accu$287]);
                  throw $(End_of_file$22g);
                });
           return __(scan$286, [0, 0]);
         });
    var close_in_noerr$300 = _f(function (ic$301) { try { return caml_ml_close_channel(ic$301); } catch (exn$420) { return 0; } });
    var print_char$303 = _f(function (c$304) { return caml_ml_output_char(stdout$190, c$304); });
    var print_string$305 = _f(function (s$306) { return __(output_string$228, [stdout$190, s$306]); });
    var print_int$307 = _f(function (i$308) { return __(output_string$228, [stdout$190, _(string_of_int$167, [i$308])]); });
    var print_float$309 = _f(function (f$310) { return __(output_string$228, [stdout$190, _(string_of_float$177, [f$310])]); });
    var print_endline$311 =
      _f(function (s$312) {
           _(output_string$228, [stdout$190, s$312]);
           caml_ml_output_char(stdout$190, 10);
           return caml_ml_flush(stdout$190);
         });
    var print_newline$313 = _f(function (param$419) { caml_ml_output_char(stdout$190, 10);
                                                      return caml_ml_flush(stdout$190); });
    var prerr_char$314 = _f(function (c$315) { return caml_ml_output_char(stderr$191, c$315); });
    var prerr_string$316 = _f(function (s$317) { return __(output_string$228, [stderr$191, s$317]); });
    var prerr_int$318 = _f(function (i$319) { return __(output_string$228, [stderr$191, _(string_of_int$167, [i$319])]); });
    var prerr_float$320 = _f(function (f$321) { return __(output_string$228, [stderr$191, _(string_of_float$177, [f$321])]); });
    var prerr_endline$322 =
      _f(function (s$323) {
           _(output_string$228, [stderr$191, s$323]);
           caml_ml_output_char(stderr$191, 10);
           return caml_ml_flush(stderr$191);
         });
    var prerr_newline$324 = _f(function (param$418) { caml_ml_output_char(stderr$191, 10);
                                                      return caml_ml_flush(stderr$191); });
    var read_line$325 = _f(function (param$417) { caml_ml_flush(stdout$190);
                                                  return __(input_line$278, [stdin$189]); });
    var read_int$326 = _f(function (param$416) { return caml_int_of_string(_(read_line$325, [0])); });
    var read_float$327 = _f(function (param$415) { return caml_float_of_string(_(read_line$325, [0])); });
    var LargeFile$334 = $();
    var $5E$5E$349 = _f(function (fmt1$350, fmt2$351) { return _($5E$152, [fmt1$350, fmt2$351]); });
    var string_of_format$352 =
      _f(function (fmt$353) {
           var s$354 = fmt$353;
           var l$355 = s$354.length;
           var r$356 = oc$$cms(l$355);
           caml_blit_string(s$354, 0, r$356, 0, l$355);
           return r$356;
         });
    var exit_function$358 = $(flush_all$222);
    var at_exit$359 =
      _f(function (f$360) {
           var g$361 = exit_function$358[0];
           return exit_function$358[0] = _f(function (param$414) { _(f$360, [0]);
                                                                   return __(g$361, [0]); });
         });
    var do_at_exit$362 = _f(function (param$413) { return __(exit_function$358[0], [0]); });
    var exit$363 = _f(function (retcode$364) { _(do_at_exit$362, [0]);
                                               return caml_sys_exit(retcode$364); });
    caml_register_named_value("Pervasives.do_at_exit", do_at_exit$362);
    return $(invalid_arg$56, failwith$54, Exit$58, min$66, max$69, abs$87, 
           max_int$98, min_int$97, lnot$92, infinity$131, neg_infinity$132, 
           nan$133, max_float$134, min_float$135, epsilon_float$136, 
           $5E$152, char_of_int$157, string_of_bool$164, bool_of_string$166, 
           string_of_int$167, string_of_float$177, $40$180, stdin$189, 
           stdout$190, stderr$191, print_char$303, print_string$305, 
           print_int$307, print_float$309, print_endline$311, print_newline$313, 
           prerr_char$314, prerr_string$316, prerr_int$318, prerr_float$320, 
           prerr_endline$322, prerr_newline$324, read_line$325, read_int$326, 
           read_float$327, open_out$216, open_out_bin$218, open_out_gen$212,
           _f(function (prim$381) { return caml_ml_flush(prim$381); }), 
           flush_all$222, _f(function (prim$383, prim$382) { return caml_ml_output_char(prim$383, prim$382); }), 
           output_string$228, output$231, _f(function (prim$385, prim$384) { return caml_ml_output_char(prim$385, prim$384); }),
           _f(function (prim$387, prim$386) { return caml_ml_output_int(prim$387, prim$386); }), 
           output_value$239, _f(function (prim$389, prim$388) { return caml_ml_seek_out(prim$389, prim$388); }),
           _f(function (prim$390) { return caml_ml_pos_out(prim$390); }),
           _f(function (prim$391) { return caml_ml_channel_size(prim$391); }), 
           close_out$246, close_out_noerr$248,
           _f(function (prim$393, prim$392) { return caml_ml_set_binary_mode(prim$393, prim$392); }), 
           open_in$255, open_in_bin$257, open_in_gen$251, _f(function (prim$394) { return caml_ml_input_char(prim$394); }),
           input_line$278, input$261, really_input$272, _f(function (prim$395) { return caml_ml_input_char(prim$395); }),
           _f(function (prim$396) { return caml_ml_input_int(prim$396); }),
           _f(function (prim$397) { return caml_input_value(prim$397); }),
           _f(function (prim$399, prim$398) { return caml_ml_seek_in(prim$399, prim$398); }),
           _f(function (prim$400) { return caml_ml_pos_in(prim$400); }),
           _f(function (prim$401) { return caml_ml_channel_size(prim$401); }),
           _f(function (prim$402) { return caml_ml_close_channel(prim$402); }), 
           close_in_noerr$300, _f(function (prim$404, prim$403) { return caml_ml_set_binary_mode(prim$404, prim$403); }),
           $(_f(function (prim$406, prim$405) { return caml_ml_seek_out_64(prim$406, prim$405); }),
           _f(function (prim$407) { return caml_ml_pos_out_64(prim$407); }),
           _f(function (prim$408) { return caml_ml_channel_size_64(prim$408); }),
           _f(function (prim$410, prim$409) { return caml_ml_seek_in_64(prim$410, prim$409); }),
           _f(function (prim$411) { return caml_ml_pos_in_64(prim$411); }),
           _f(function (prim$412) { return caml_ml_channel_size_64(prim$412); })), 
           string_of_format$352, $5E$5E$349, exit$363, at_exit$359, valid_float_lexem$172, 
           unsafe_really_input$266, do_at_exit$362);
  }();
var oc$Array$ =
  function () {
    var init$65 =
      _f(function (l$66, f$67) {
           if (l$66 === 0) return $();
           var res$68 = caml_make_vect(l$66, _(f$67, [0]));
           var i$69;
           for (i$69 = 1; i$69 <= -1 + l$66; i$69++) { (function (i$69) { res$68[i$69] = _(f$67, [i$69]); }(i$69)); }
           return res$68;
         });
    var make_matrix$70 =
      _f(function (sx$71, sy$72, init$73) {
           var res$74 = caml_make_vect(sx$71, $());
           var x$75;
           for (x$75 = 0;
           x$75 <= -1 + sx$71;
           x$75++) {
             (function (x$75) { res$74[x$75] = caml_make_vect(sy$72, init$73); }(x$75));
           }
           return res$74;
         });
    var copy$77 =
      _f(function (a$78) {
           var l$79 = a$78.length;
           if (l$79 === 0) return $();
           var res$80 = caml_make_vect(l$79, a$78[0]);
           var i$81;
           for (i$81 = 1; i$81 <= -1 + l$79; i$81++) { (function (i$81) { res$80[i$81] = a$78[i$81]; }(i$81)); }
           return res$80;
         });
    var append$82 =
      _f(function (a1$83, a2$84) {
           var l1$85 = a1$83.length;
           var l2$86 = a2$84.length;
           if (l1$85 === 0 && l2$86 === 0) return $();
           var r$87 = caml_make_vect(l1$85 + l2$86, (l1$85 > 0 ? a1$83 : a2$84)[0]);
           var i$88;
           for (i$88 = 0; i$88 <= l1$85 - 1; i$88++) { (function (i$88) { r$87[i$88] = a1$83[i$88]; }(i$88)); }
           var i$89;
           for (i$89 = 0; i$89 <= l2$86 - 1; i$89++) { (function (i$89) { r$87[i$89 + l1$85] = a2$84[i$89]; }(i$89)); }
           return r$87;
         });
    var concat_aux$90 =
      _f(function (init$91, al$92) {
           var size$93 =
             _f(function (accu$94, param$262) {
                  if (param$262) return __(size$93, [accu$94 + (param$262[0]).length, param$262[1]]);
                  return accu$94;
                });
           var res$97 = caml_make_vect(_(size$93, [0, al$92]), init$91);
           var fill$98 =
             _f(function (pos$99, param$261) {
                  if (param$261)
                  {
                    var h$100 = param$261[0];
                    var i$102;
                    for (i$102 = 0;
                    i$102 <= h$100.length - 1;
                    i$102++) {
                      (function (i$102) { res$97[pos$99 + i$102] = h$100[i$102]; }(i$102));
                    }
                    return __(fill$98, [pos$99 + h$100.length, param$261[1]]);
                  }
                  return 0;
                });
           _(fill$98, [0, al$92]);
           return res$97;
         });
    var concat$103 =
      _f(function (al$104) {
           var find_init$105 =
             _f(function (param$260) {
                  if (param$260)
                  {
                    var a$106 = param$260[0];
                    if (a$106.length > 0) return __(concat_aux$90, [a$106[0], al$104]);
                    return __(find_init$105, [param$260[1]]);
                  }
                  return $();
                });
           return __(find_init$105, [al$104]);
         });
    var sub$108 =
      _f(function (a$109, ofs$110, len$111) {
           if (ofs$110 < 0 || (len$111 < 0 || ofs$110 > a$109.length - len$111)) return __(oc$Pervasives$[0], ["Array.sub"]);
           if (len$111 === 0) return $();
           var r$112 = caml_make_vect(len$111, a$109[ofs$110]);
           var i$113;
           for (i$113 = 1; i$113 <= len$111 - 1; i$113++) { (function (i$113) { r$112[i$113] = a$109[ofs$110 + i$113]; }(i$113)); }
           return r$112;
         });
    var fill$114 =
      _f(function (a$115, ofs$116, len$117, v$118) {
           if (ofs$116 < 0 || (len$117 < 0 || ofs$116 > a$115.length - len$117)) return __(oc$Pervasives$[0], ["Array.fill"]);
           var i$119;
           for (i$119 = ofs$116; i$119 <= ofs$116 + len$117 - 1; i$119++) { (function (i$119) { a$115[i$119] = v$118; }(i$119)); }
         });
    var blit$120 =
      _f(function (a1$121, ofs1$122, a2$123, ofs2$124, len$125) {
           if (len$125 < 0 ||
               (ofs1$122 < 0 || (ofs1$122 > a1$121.length - len$125 || (ofs2$124 < 0 || ofs2$124 > a2$123.length - len$125))))
           return __(oc$Pervasives$[0], ["Array.blit"]);
           if (ofs1$122 < ofs2$124)
           {
             var i$126;
             for (i$126 = len$125 - 1;
             i$126 >= 0;
             i$126--) {
               (function (i$126) { a2$123[ofs2$124 + i$126] = a1$121[ofs1$122 + i$126]; }(i$126));
             }
           }
           var i$127;
           for (i$127 = 0;
           i$127 <= len$125 - 1;
           i$127++) {
             (function (i$127) { a2$123[ofs2$124 + i$127] = a1$121[ofs1$122 + i$127]; }(i$127));
           }
         });
    var iter$128 =
      _f(function (f$129, a$130) {
           var i$131;
           for (i$131 = 0; i$131 <= a$130.length - 1; i$131++) { (function (i$131) { _(f$129, [a$130[i$131]]); }(i$131)); }
         });
    var map$132 =
      _f(function (f$133, a$134) {
           var l$135 = a$134.length;
           if (l$135 === 0) return $();
           var r$136 = caml_make_vect(l$135, _(f$133, [a$134[0]]));
           var i$137;
           for (i$137 = 1; i$137 <= l$135 - 1; i$137++) { (function (i$137) { r$136[i$137] = _(f$133, [a$134[i$137]]); }(i$137)); }
           return r$136;
         });
    var iteri$138 =
      _f(function (f$139, a$140) {
           var i$141;
           for (i$141 = 0; i$141 <= a$140.length - 1; i$141++) { (function (i$141) { _(f$139, [i$141, a$140[i$141]]); }(i$141)); }
         });
    var mapi$142 =
      _f(function (f$143, a$144) {
           var l$145 = a$144.length;
           if (l$145 === 0) return $();
           var r$146 = caml_make_vect(l$145, _(f$143, [0, a$144[0]]));
           var i$147;
           for (i$147 = 1;
           i$147 <= l$145 - 1;
           i$147++) {
             (function (i$147) { r$146[i$147] = _(f$143, [i$147, a$144[i$147]]); }(i$147));
           }
           return r$146;
         });
    var to_list$148 =
      _f(function (a$149) {
           var tolist$150 =
             _f(function (i$151, res$152) {
                  if (i$151 < 0) return res$152;
                  return __(tolist$150, [i$151 - 1, $(a$149[i$151], res$152)]);
                });
           return __(tolist$150, [a$149.length - 1, 0]);
         });
    var list_length$153 =
      _f(function (accu$154, param$259) {
           if (param$259) return __(list_length$153, [1 + accu$154, param$259[1]]);
           return accu$154;
         });
    var of_list$157 =
      _f(function (l$160) {
           if (l$160)
           {
             var a$161 = caml_make_vect(_(list_length$153, [0, l$160]), l$160[0]);
             var fill$162 =
               _f(function (i$163, param$258) {
                    if (param$258) { a$161[i$163] = param$258[0];
                                     return __(fill$162, [i$163 + 1, param$258[1]]); }
                    return a$161;
                  });
             return __(fill$162, [1, l$160[1]]);
           }
           return $();
         });
    var fold_left$166 =
      _f(function (f$167, x$168, a$169) {
           var r$170 = x$168;
           var i$171;
           for (i$171 = 0;
           i$171 <= a$169.length - 1;
           i$171++) {
             (function (i$171) { r$170 = _(f$167, [r$170, a$169[i$171]]); }(i$171));
           }
           return r$170;
         });
    var fold_right$172 =
      _f(function (f$173, a$174, x$175) {
           var r$176 = x$175;
           var i$177;
           for (i$177 = a$174.length - 1;
           i$177 >= 0;
           i$177--) {
             (function (i$177) { r$176 = _(f$173, [a$174[i$177], r$176]); }(i$177));
           }
           return r$176;
         });
    var Bottom$178 = $("Array.Bottom");
    var sort$179 =
      _f(function (cmp$180, a$181) {
           var maxson$182 =
             _f(function (l$183, i$184) {
                  var i31$185 = i$184 + i$184 + i$184 + 1;
                  var x$186 = i31$185;
                  if (i31$185 + 2 < l$183)
                  {
                    if (_(cmp$180, [oc$$arefs(a$181, i31$185), oc$$arefs(a$181, i31$185 + 1)]) < 0) x$186 = i31$185 + 1; else ;
                    if (_(cmp$180, [oc$$arefs(a$181, x$186), oc$$arefs(a$181, i31$185 + 2)]) < 0) x$186 = i31$185 + 2; else ;
                    return x$186;
                  }
                  if (i31$185 + 1 < l$183 && _(cmp$180, [oc$$arefs(a$181, i31$185), oc$$arefs(a$181, i31$185 + 1)]) < 0)
                  return i31$185 + 1;
                  if (i31$185 < l$183) return i31$185;
                  throw $(Bottom$178, i$184);
                });
           var trickledown$187 =
             _f(function (l$188, i$189, e$190) {
                  var j$191 = _(maxson$182, [l$188, i$189]);
                  if (_(cmp$180, [oc$$arefs(a$181, j$191), e$190]) > 0)
                  {
                    oc$$asets(a$181, i$189, oc$$arefs(a$181, j$191));
                    return __(trickledown$187, [l$188, j$191, e$190]);
                  }
                  return oc$$asets(a$181, i$189, e$190);
                });
           var trickle$192 =
             _f(function (l$193, i$194, e$195) {
                  try {
                    return _(trickledown$187, [l$193, i$194, e$195]);
                  } catch (exn$257) {
                    if (exn$257[0] === Bottom$178) return oc$$asets(a$181, exn$257[1], e$195);
                    throw exn$257;
                  }
                });
           var bubbledown$197 =
             _f(function (l$198, i$199) {
                  var j$200 = _(maxson$182, [l$198, i$199]);
                  oc$$asets(a$181, i$199, oc$$arefs(a$181, j$200));
                  return __(bubbledown$197, [l$198, j$200]);
                });
           var bubble$201 =
             _f(function (l$202, i$203) {
                  try {
                    return _(bubbledown$197, [l$202, i$203]);
                  } catch (exn$256) {
                    if (exn$256[0] === Bottom$178) return exn$256[1];
                    throw exn$256;
                  }
                });
           var trickleup$205 =
             _f(function (i$206, e$207) {
                  var father$208 = (i$206 - 1) / 3 >> 0;
                  if (i$206 !== father$208) ; else throw $(Assert_failure$26g, $("ocaml/stdlib/array.ml", 208, 4));
                  if (_(cmp$180, [oc$$arefs(a$181, father$208), e$207]) < 0)
                  {
                    oc$$asets(a$181, i$206, oc$$arefs(a$181, father$208));
                    if (father$208 > 0) return __(trickleup$205, [father$208, e$207]);
                    return oc$$asets(a$181, 0, e$207);
                  }
                  return oc$$asets(a$181, i$206, e$207);
                });
           var l$209 = a$181.length;
           var i$210;
           for (i$210 = ((l$209 + 1) / 3 >> 0) - 1;
           i$210 >= 0;
           i$210--) {
             (function (i$210) { _(trickle$192, [l$209, i$210, oc$$arefs(a$181, i$210)]); }(i$210));
           }
           var i$211;
           for (i$211 = l$209 - 1;
           i$211 >= 2;
           i$211--) {
             (function (i$211) {
                var e$212 = oc$$arefs(a$181, i$211);
                oc$$asets(a$181, i$211, oc$$arefs(a$181, 0));
                _(trickleup$205, [_(bubble$201, [i$211, 0]), e$212]);
              }(i$211));
           }
           if (l$209 > 1)
           {
             var e$213 = oc$$arefs(a$181, 1);
             oc$$asets(a$181, 1, oc$$arefs(a$181, 0));
             return oc$$asets(a$181, 0, e$213);
           }
           return 0;
         });
    var cutoff$214 = 5;
    var stable_sort$215 =
      _f(function (cmp$216, a$217) {
           var merge$218 =
             _f(function (src1ofs$219, src1len$220, src2$221, src2ofs$222, src2len$223, dst$224, dstofs$225) {
                  var src1r$226 = src1ofs$219 + src1len$220;
                  var src2r$227 = src2ofs$222 + src2len$223;
                  var loop$228 =
                    _f(function (i1$229, s1$230, i2$231, s2$232, d$233) {
                         if (_(cmp$216, [s1$230, s2$232]) <= 0)
                         {
                           oc$$asets(dst$224, d$233, s1$230);
                           var i1$234 = i1$229 + 1;
                           if (i1$234 < src1r$226)
                           return __(loop$228, [i1$234, oc$$arefs(a$217, i1$234), i2$231, s2$232, d$233 + 1]);
                           return __(blit$120, [src2$221, i2$231, dst$224, d$233 + 1, src2r$227 - i2$231]);
                         }
                         oc$$asets(dst$224, d$233, s2$232);
                         var i2$235 = i2$231 + 1;
                         if (i2$235 < src2r$227)
                         return __(loop$228, [i1$229, s1$230, i2$235, oc$$arefs(src2$221, i2$235), d$233 + 1]);
                         return __(blit$120, [a$217, i1$229, dst$224, d$233 + 1, src1r$226 - i1$229]);
                       });
                  return __(loop$228,
                         [src1ofs$219, oc$$arefs(a$217, src1ofs$219), src2ofs$222, oc$$arefs(src2$221, src2ofs$222), dstofs$225]);
                });
           var isortto$236 =
             _f(function (srcofs$237, dst$238, dstofs$239, len$240) {
                  var i$241;
                  for (i$241 = 0;
                  i$241 <= len$240 - 1;
                  i$241++) {
                    (function (i$241) {
                       var e$242 = oc$$arefs(a$217, srcofs$237 + i$241);
                       var j$243 = dstofs$239 + i$241 - 1;
                       while (j$243 >= dstofs$239 && _(cmp$216, [oc$$arefs(dst$238, j$243), e$242]) > 0)
                       {
                         oc$$asets(dst$238, j$243 + 1, oc$$arefs(dst$238, j$243));
                         j$243 = -1 + j$243;
                       }
                       oc$$asets(dst$238, j$243 + 1, e$242);
                     }(i$241));
                  }
                });
           var sortto$244 =
             _f(function (srcofs$245, dst$246, dstofs$247, len$248) {
                  if (len$248 <= cutoff$214) return __(isortto$236, [srcofs$245, dst$246, dstofs$247, len$248]);
                  var l1$249 = len$248 / 2 >> 0;
                  var l2$250 = len$248 - l1$249;
                  _(sortto$244, [srcofs$245 + l1$249, dst$246, dstofs$247 + l1$249, l2$250]);
                  _(sortto$244, [srcofs$245, a$217, srcofs$245 + l2$250, l1$249]);
                  return __(merge$218, [srcofs$245 + l2$250, l1$249, dst$246, dstofs$247 + l1$249, l2$250, dst$246, dstofs$247]);
                });
           var l$251 = a$217.length;
           if (l$251 <= cutoff$214) return __(isortto$236, [0, a$217, 0, l$251]);
           var l1$252 = l$251 / 2 >> 0;
           var l2$253 = l$251 - l1$252;
           var t$254 = caml_make_vect(l2$253, oc$$arefs(a$217, 0));
           _(sortto$244, [l1$252, t$254, 0, l2$253]);
           _(sortto$244, [0, a$217, l2$253, l1$252]);
           return __(merge$218, [l2$253, l1$252, t$254, 0, l2$253, a$217, 0]);
         });
    return $(init$65, make_matrix$70, make_matrix$70, append$82, concat$103, 
           sub$108, copy$77, fill$114, blit$120, to_list$148, of_list$157, 
           iter$128, map$132, iteri$138, mapi$142, fold_left$166, fold_right$172, 
           sort$179, stable_sort$215, stable_sort$215);
  }();
var oc$List$ =
  function () {
    var length_aux$58 =
      _f(function (len$59, param$394) { if (param$394) return __(length_aux$58, [len$59 + 1, param$394[1]]);
                                        return len$59; });
    var length$62 = _f(function (l$63) { return __(length_aux$58, [0, l$63]); });
    var hd$64 = _f(function (param$393) { if (param$393) return param$393[0];
                                          return __(oc$Pervasives$[1], ["hd"]); });
    var tl$67 = _f(function (param$392) { if (param$392) return param$392[1];
                                          return __(oc$Pervasives$[1], ["tl"]); });
    var nth$70 =
      _f(function (l$71, n$72) {
           if (n$72 < 0) return __(oc$Pervasives$[0], ["List.nth"]);
           var nth_aux$73 =
             _f(function (l$74, n$75) {
                  if (!l$74) return __(oc$Pervasives$[1], ["nth"]);
                  if (n$75 === 0) return l$74[0];
                  return __(nth_aux$73, [l$74[1], n$75 - 1]);
                });
           return __(nth_aux$73, [l$71, n$72]);
         });
    var append$78 = oc$Pervasives$[21];
    var rev_append$79 =
      _f(function (l1$80, l2$81) { if (l1$80) return __(rev_append$79, [l1$80[1], $(l1$80[0], l2$81)]);
                                   return l2$81; });
    var rev$84 = _f(function (l$85) { return __(rev_append$79, [l$85, 0]); });
    var flatten$86 =
      _f(function (param$391) {
           if (param$391) return __(oc$Pervasives$[21], [param$391[0], _(flatten$86, [param$391[1]])]);
           return 0;
         });
    var map$90 =
      _f(function (f$91, param$390) {
           if (param$390) { var r$94 = _(f$91, [param$390[0]]);
                            return $(r$94, _(map$90, [f$91, param$390[1]])); }
           return 0;
         });
    var rev_map$95 =
      _f(function (f$96, l$97) {
           var rmap_f$98 =
             _f(function (accu$99, param$389) {
                  if (param$389) return __(rmap_f$98, [$(_(f$96, [param$389[0]]), accu$99), param$389[1]]);
                  return accu$99;
                });
           return __(rmap_f$98, [0, l$97]);
         });
    var iter$102 =
      _f(function (f$103, param$388) {
           if (param$388) { _(f$103, [param$388[0]]);
                            return __(iter$102, [f$103, param$388[1]]); }
           return 0;
         });
    var fold_left$106 =
      _f(function (f$107, accu$108, l$109) {
           if (l$109) return __(fold_left$106, [f$107, _(f$107, [accu$108, l$109[0]]), l$109[1]]);
           return accu$108;
         });
    var fold_right$112 =
      _f(function (f$113, l$114, accu$115) {
           if (l$114) return __(f$113, [l$114[0], _(fold_right$112, [f$113, l$114[1], accu$115])]);
           return accu$115;
         });
    var map2$118 =
      _f(function (f$119, l1$120, l2$121) {
           var $r34 = false;
           r$34: {
             if (!l1$120) { if (l2$121) { $r34 = true;
                                          break r$34; }
                            return 0; }
             if (!l2$121) { $r34 = true;
                            break r$34; }
             var r$126 = _(f$119, [l1$120[0], l2$121[0]]);
             return $(r$126, _(map2$118, [f$119, l1$120[1], l2$121[1]]));
           }
           if ($r34) return __(oc$Pervasives$[0], ["List.map2"]);
         });
    var rev_map2$127 =
      _f(function (f$128, l1$129, l2$130) {
           var rmap2_f$131 =
             _f(function (accu$132, l1$133, l2$134) {
                  var $r31 = false;
                  r$31: {
                    if (!l1$133) { if (l2$134) { $r31 = true;
                                                 break r$31; }
                                   return accu$132; }
                    if (!l2$134) { $r31 = true;
                                   break r$31; }
                    return __(rmap2_f$131, [$(_(f$128, [l1$133[0], l2$134[0]]), accu$132), l1$133[1], l2$134[1]]);
                  }
                  if ($r31) return __(oc$Pervasives$[0], ["List.rev_map2"]);
                });
           return __(rmap2_f$131, [0, l1$129, l2$130]);
         });
    var iter2$139 =
      _f(function (f$140, l1$141, l2$142) {
           var $r30 = false;
           r$30: {
             if (!l1$141) { if (l2$142) { $r30 = true;
                                          break r$30; }
                            return 0; }
             if (!l2$142) { $r30 = true;
                            break r$30; }
             _(f$140, [l1$141[0], l2$142[0]]);
             return __(iter2$139, [f$140, l1$141[1], l2$142[1]]);
           }
           if ($r30) return __(oc$Pervasives$[0], ["List.iter2"]);
         });
    var fold_left2$147 =
      _f(function (f$148, accu$149, l1$150, l2$151) {
           var $r29 = false;
           r$29: {
             if (!l1$150) { if (l2$151) { $r29 = true;
                                          break r$29; }
                            return accu$149; }
             if (!l2$151) { $r29 = true;
                            break r$29; }
             return __(fold_left2$147, [f$148, _(f$148, [accu$149, l1$150[0], l2$151[0]]), l1$150[1], l2$151[1]]);
           }
           if ($r29) return __(oc$Pervasives$[0], ["List.fold_left2"]);
         });
    var fold_right2$156 =
      _f(function (f$157, l1$158, l2$159, accu$160) {
           var $r28 = false;
           r$28: {
             if (!l1$158) { if (l2$159) { $r28 = true;
                                          break r$28; }
                            return accu$160; }
             if (!l2$159) { $r28 = true;
                            break r$28; }
             return __(f$157, [l1$158[0], l2$159[0], _(fold_right2$156, [f$157, l1$158[1], l2$159[1], accu$160])]);
           }
           if ($r28) return __(oc$Pervasives$[0], ["List.fold_right2"]);
         });
    var for_all$165 =
      _f(function (p$166, param$377) {
           if (param$377) return _(p$166, [param$377[0]]) && _(for_all$165, [p$166, param$377[1]]);
           return 1;
         });
    var exists$169 =
      _f(function (p$170, param$376) {
           if (param$376) return _(p$170, [param$376[0]]) || _(exists$169, [p$170, param$376[1]]);
           return 0;
         });
    var for_all2$173 =
      _f(function (p$174, l1$175, l2$176) {
           var $r27 = false;
           r$27: {
             if (!l1$175) { if (l2$176) { $r27 = true;
                                          break r$27; }
                            return 1; }
             if (!l2$176) { $r27 = true;
                            break r$27; }
             return _(p$174, [l1$175[0], l2$176[0]]) && _(for_all2$173, [p$174, l1$175[1], l2$176[1]]);
           }
           if ($r27) return __(oc$Pervasives$[0], ["List.for_all2"]);
         });
    var exists2$181 =
      _f(function (p$182, l1$183, l2$184) {
           var $r26 = false;
           r$26: {
             if (!l1$183) { if (l2$184) { $r26 = true;
                                          break r$26; }
                            return 0; }
             if (!l2$184) { $r26 = true;
                            break r$26; }
             return _(p$182, [l1$183[0], l2$184[0]]) || _(exists2$181, [p$182, l1$183[1], l2$184[1]]);
           }
           if ($r26) return __(oc$Pervasives$[0], ["List.exists2"]);
         });
    var mem$189 =
      _f(function (x$190, param$371) {
           if (param$371) return caml_compare(param$371[0], x$190) === 0 || _(mem$189, [x$190, param$371[1]]);
           return 0;
         });
    var memq$193 =
      _f(function (x$194, param$370) {
           if (param$370) return param$370[0] === x$194 || _(memq$193, [x$194, param$370[1]]);
           return 0;
         });
    var assoc$197 =
      _f(function (x$198, param$368) {
           if (param$368)
           {
             var match$369 = param$368[0];
             if (caml_compare(match$369[0], x$198) === 0) return match$369[1];
             return __(assoc$197, [x$198, param$368[1]]);
           }
           throw $(Not_found$20g);
         });
    var assq$202 =
      _f(function (x$203, param$366) {
           if (param$366)
           {
             var match$367 = param$366[0];
             if (match$367[0] === x$203) return match$367[1];
             return __(assq$202, [x$203, param$366[1]]);
           }
           throw $(Not_found$20g);
         });
    var mem_assoc$207 =
      _f(function (x$208, param$364) {
           if (param$364) return caml_compare(param$364[0][0], x$208) === 0 || _(mem_assoc$207, [x$208, param$364[1]]);
           return 0;
         });
    var mem_assq$212 =
      _f(function (x$213, param$362) {
           if (param$362) return param$362[0][0] === x$213 || _(mem_assq$212, [x$213, param$362[1]]);
           return 0;
         });
    var remove_assoc$217 =
      _f(function (x$218, param$361) {
           if (param$361)
           {
             var l$222 = param$361[1];
             var pair$221 = param$361[0];
             if (caml_compare(pair$221[0], x$218) === 0) return l$222;
             return $(pair$221, _(remove_assoc$217, [x$218, l$222]));
           }
           return 0;
         });
    var remove_assq$223 =
      _f(function (x$224, param$360) {
           if (param$360)
           {
             var l$228 = param$360[1];
             var pair$227 = param$360[0];
             if (pair$227[0] === x$224) return l$228;
             return $(pair$227, _(remove_assq$223, [x$224, l$228]));
           }
           return 0;
         });
    var find$229 =
      _f(function (p$230, param$359) {
           if (param$359)
           {
             var x$231 = param$359[0];
             if (_(p$230, [x$231])) return x$231;
             return __(find$229, [p$230, param$359[1]]);
           }
           throw $(Not_found$20g);
         });
    var find_all$233 =
      _f(function (p$234) {
           var find$235 =
             _f(function (accu$236, param$358) {
                  if (param$358)
                  {
                    var l$238 = param$358[1];
                    var x$237 = param$358[0];
                    if (_(p$234, [x$237])) return __(find$235, [$(x$237, accu$236), l$238]);
                    return __(find$235, [accu$236, l$238]);
                  }
                  return __(rev$84, [accu$236]);
                });
           return __(find$235, [0]);
         });
    var partition$240 =
      _f(function (p$241, l$242) {
           var part$243 =
             _f(function (yes$244, no$245, param$357) {
                  if (param$357)
                  {
                    var l$247 = param$357[1];
                    var x$246 = param$357[0];
                    if (_(p$241, [x$246])) return __(part$243, [$(x$246, yes$244), no$245, l$247]);
                    return __(part$243, [yes$244, $(x$246, no$245), l$247]);
                  }
                  return $(_(rev$84, [yes$244]), _(rev$84, [no$245]));
                });
           return __(part$243, [0, 0, l$242]);
         });
    var split$248 =
      _f(function (param$354) {
           if (param$354)
           {
             var match$356 = param$354[0];
             var match$355 = _(split$248, [param$354[1]]);
             return $($(match$356[0], match$355[0]), $(match$356[1], match$355[1]));
           }
           return $(0, 0);
         });
    var combine$254 =
      _f(function (l1$255, l2$256) {
           var $r21 = false;
           r$21: {
             if (!l1$255) { if (l2$256) { $r21 = true;
                                          break r$21; }
                            return 0; }
             if (!l2$256) { $r21 = true;
                            break r$21; }
             return $($(l1$255[0], l2$256[0]), _(combine$254, [l1$255[1], l2$256[1]]));
           }
           if ($r21) return __(oc$Pervasives$[0], ["List.combine"]);
         });
    var merge$261 =
      _f(function (cmp$262, l1$263, l2$264) {
           if (!l1$263) return l2$264;
           if (l2$264)
           {
             var h2$269 = l2$264[0];
             var h1$267 = l1$263[0];
             if (_(cmp$262, [h1$267, h2$269]) <= 0) return $(h1$267, _(merge$261, [cmp$262, l1$263[1], l2$264]));
             return $(h2$269, _(merge$261, [cmp$262, l1$263, l2$264[1]]));
           }
           return l1$263;
         });
    var chop$271 =
      _f(function (k$272, l$273) {
           if (k$272 === 0) return l$273;
           if (l$273) return __(chop$271, [k$272 - 1, l$273[1]]);
           throw $(Assert_failure$26g, $("ocaml/stdlib/list.ml", 213, 11));
         });
    var stable_sort$276 =
      _f(function (cmp$277, l$278) {
           var rev_merge$279 =
             _f(function (l1$280, l2$281, accu$282) {
                  if (!l1$280) return __(rev_append$79, [l2$281, accu$282]);
                  if (l2$281)
                  {
                    var h2$287 = l2$281[0];
                    var h1$285 = l1$280[0];
                    if (_(cmp$277, [h1$285, h2$287]) <= 0) return __(rev_merge$279, [l1$280[1], l2$281, $(h1$285, accu$282)]);
                    return __(rev_merge$279, [l1$280, l2$281[1], $(h2$287, accu$282)]);
                  }
                  return __(rev_append$79, [l1$280, accu$282]);
                });
           var rev_merge_rev$289 =
             _f(function (l1$290, l2$291, accu$292) {
                  if (!l1$290) return __(rev_append$79, [l2$291, accu$292]);
                  if (l2$291)
                  {
                    var h2$297 = l2$291[0];
                    var h1$295 = l1$290[0];
                    if (_(cmp$277, [h1$295, h2$297]) > 0) return __(rev_merge_rev$289, [l1$290[1], l2$291, $(h1$295, accu$292)]);
                    return __(rev_merge_rev$289, [l1$290, l2$291[1], $(h2$297, accu$292)]);
                  }
                  return __(rev_append$79, [l1$290, accu$292]);
                });
           var sort$299 =
             _f(function (n$301, l$302) {
                  var $r9 = false;
                  r$9: {
                    if (!(n$301 !== 2))
                    {
                      if (!l$302) { $r9 = true;
                                    break r$9; }
                      var match$334 = l$302[1];
                      if (!match$334) { $r9 = true;
                                        break r$9; }
                      var x2$304 = match$334[0];
                      var x1$303 = l$302[0];
                      if (_(cmp$277, [x1$303, x2$304]) <= 0) return $(x1$303, $(x2$304, 0));
                      return $(x2$304, $(x1$303, 0));
                    }
                    if (n$301 !== 3) { $r9 = true;
                                       break r$9; }
                    if (!l$302) { $r9 = true;
                                  break r$9; }
                    var match$336 = l$302[1];
                    if (!match$336) { $r9 = true;
                                      break r$9; }
                    var match$337 = match$336[1];
                    if (!match$337) { $r9 = true;
                                      break r$9; }
                    var x3$307 = match$337[0];
                    var x2$306 = match$336[0];
                    var x1$305 = l$302[0];
                    if (!(_(cmp$277, [x1$305, x2$306]) <= 0))
                    {
                      if (_(cmp$277, [x1$305, x3$307]) <= 0) return $(x2$306, $(x1$305, $(x3$307, 0)));
                      if (_(cmp$277, [x2$306, x3$307]) <= 0) return $(x2$306, $(x3$307, $(x1$305, 0)));
                      return $(x3$307, $(x2$306, $(x1$305, 0)));
                    }
                    if (_(cmp$277, [x2$306, x3$307]) <= 0) return $(x1$305, $(x2$306, $(x3$307, 0)));
                    if (_(cmp$277, [x1$305, x3$307]) <= 0) return $(x1$305, $(x3$307, $(x2$306, 0)));
                    return $(x3$307, $(x1$305, $(x2$306, 0)));
                  }
                  if ($r9)
                  {
                    var n1$310 = n$301 >>> 1;
                    var n2$311 = n$301 - n1$310;
                    var l2$312 = _(chop$271, [n1$310, l$302]);
                    var s1$313 = _(rev_sort$300, [n1$310, l$302]);
                    var s2$314 = _(rev_sort$300, [n2$311, l2$312]);
                    return __(rev_merge_rev$289, [s1$313, s2$314, 0]);
                  }
                });
           var rev_sort$300 =
             _f(function (n$315, l$316) {
                  var $r15 = false;
                  r$15: {
                    if (!(n$315 !== 2))
                    {
                      if (!l$316) { $r15 = true;
                                    break r$15; }
                      var match$341 = l$316[1];
                      if (!match$341) { $r15 = true;
                                        break r$15; }
                      var x2$318 = match$341[0];
                      var x1$317 = l$316[0];
                      if (_(cmp$277, [x1$317, x2$318]) > 0) return $(x1$317, $(x2$318, 0));
                      return $(x2$318, $(x1$317, 0));
                    }
                    if (n$315 !== 3) { $r15 = true;
                                       break r$15; }
                    if (!l$316) { $r15 = true;
                                  break r$15; }
                    var match$343 = l$316[1];
                    if (!match$343) { $r15 = true;
                                      break r$15; }
                    var match$344 = match$343[1];
                    if (!match$344) { $r15 = true;
                                      break r$15; }
                    var x3$321 = match$344[0];
                    var x2$320 = match$343[0];
                    var x1$319 = l$316[0];
                    if (!(_(cmp$277, [x1$319, x2$320]) > 0))
                    {
                      if (_(cmp$277, [x1$319, x3$321]) > 0) return $(x2$320, $(x1$319, $(x3$321, 0)));
                      if (_(cmp$277, [x2$320, x3$321]) > 0) return $(x2$320, $(x3$321, $(x1$319, 0)));
                      return $(x3$321, $(x2$320, $(x1$319, 0)));
                    }
                    if (_(cmp$277, [x2$320, x3$321]) > 0) return $(x1$319, $(x2$320, $(x3$321, 0)));
                    if (_(cmp$277, [x1$319, x3$321]) > 0) return $(x1$319, $(x3$321, $(x2$320, 0)));
                    return $(x3$321, $(x1$319, $(x2$320, 0)));
                  }
                  if ($r15)
                  {
                    var n1$324 = n$315 >>> 1;
                    var n2$325 = n$315 - n1$324;
                    var l2$326 = _(chop$271, [n1$324, l$316]);
                    var s1$327 = _(sort$299, [n1$324, l$316]);
                    var s2$328 = _(sort$299, [n2$325, l2$326]);
                    return __(rev_merge$279, [s1$327, s2$328, 0]);
                  }
                });
           var len$329 = _(length$62, [l$278]);
           if (len$329 < 2) return l$278;
           return __(sort$299, [len$329, l$278]);
         });
    return $(length$62, hd$64, tl$67, nth$70, rev$84, append$78, rev_append$79, 
           flatten$86, flatten$86, iter$102, map$90, rev_map$95, fold_left$106, 
           fold_right$112, iter2$139, map2$118, rev_map2$127, fold_left2$147, 
           fold_right2$156, for_all$165, exists$169, for_all2$173, exists2$181, 
           mem$189, memq$193, find$229, find_all$233, find_all$233, partition$240, 
           assoc$197, assq$202, mem_assoc$207, mem_assq$212, remove_assoc$217, 
           remove_assq$223, split$248, combine$254, stable_sort$276, 
           stable_sort$276, stable_sort$276, merge$261);
  }();
var oc$Int64$ =
  function () {
    var zero$78 = "0";
    var one$79 = "1";
    var minus_one$80 = "-1";
    var succ$81 = _f(function (n$82) { return n$82 + "1"; });
    var pred$83 = _f(function (n$84) { return n$84 - "1"; });
    var abs$85 = _f(function (n$86) { if (n$86 >= "0") return n$86;
                                      return -n$86; });
    var min_int$87 = "-9223372036854775808";
    var max_int$88 = "9223372036854775807";
    var lognot$89 = _f(function (n$90) { return n$90 ^ "-1"; });
    var to_string$92 = _f(function (n$93) { return caml_format_int("%d", n$93); });
    var compare$98 = _f(function (x$99, y$100) { return caml_int64_compare(x$99, y$100); });
    return $(zero$78, one$79, minus_one$80, succ$81, pred$83, abs$85, max_int$88, min_int$87, lognot$89, to_string$92, compare$98);
  }();
var oc$Random$ =
  function () {
    var init$74 = _f(function (prim$124) { ;
                                           return 0; });
    var full_init$75 = _f(function (prim$123) { ;
                                                return 0; });
    var self_init$76 = _f(function (prim$122) { ;
                                                return 0; });
    var bits$77 = _f(function (param$121) { return Math.floor(Math.random() * 1073741824); });
    var int$78 = _f(function (b$79) { return Math.floor(Math.random() * b$79); });
    var int32$80 = _f(function (b$81) { return Math.floor(Math.random() * b$81); });
    var nativeint$82 = _f(function (b$83) { return Math.floor(Math.random() * b$83); });
    var int64$84 = _f(function (param$120) { return oc$Int64$[0]; });
    var float$85 = _f(function (b$86) { return Math.random() * b$86; });
    var bool$87 = _f(function (param$119) { return Math.random() < 0.5; });
    var State$104 =
      function () {
        var make$89 = _f(function (prim$118) { ;
                                               return 0; });
        var make_self_init$90 = _f(function (prim$117) { ;
                                                         return 0; });
        var copy$91 = _f(function (prim$116) { ;
                                               return 0; });
        var bits$92 = _f(function (param$115) { return __(bits$77, [0]); });
        var int$93 = _f(function (param$114, b$94) { return __(int$78, [b$94]); });
        var int32$95 = _f(function (param$113, b$96) { return __(int32$80, [b$96]); });
        var nativeint$97 = _f(function (param$112, b$98) { return __(nativeint$82, [b$98]); });
        var int64$99 = _f(function (param$111, b$100) { return __(int64$84, [b$100]); });
        var float$101 = _f(function (param$110, b$102) { return __(float$85, [b$102]); });
        var bool$103 = _f(function (param$109) { return __(bool$87, [0]); });
        return $(make$89, make_self_init$90, copy$91, bits$92, int$93, int32$95, nativeint$97, int64$99, float$101, bool$103);
      }();
    var get_state$105 = _f(function (prim$108) { ;
                                                 return 0; });
    var set_state$106 = _f(function (prim$107) { ;
                                                 return 0; });
    return $(init$74, full_init$75, self_init$76, bits$77, int$78, int32$80, 
           nativeint$82, int64$84, float$85, bool$87, State$104, get_state$105, 
           set_state$106);
  }();
var oc$Ocamljs$ =
  function () {
    var option_of_nullable$74 = _f(function (x$75) { if (x$75 === null) return 0;
                                                     return $(x$75); });
    var nullable_of_option$76 = _f(function (x$77) { if (x$77) return x$77[0];
                                                     return null; });
    var is_null$79 = _f(function (a$80) { return caml_equal(a$80, null); });
    var jsfun$82 = _f(function (f$83) { return function (a$84) { return caml_callback(f$83, a$84); }; });
    var jsfun2$85 = _f(function (f$86) { return function (a1$87, a2$88) { return caml_callback2(f$86, a1$87, a2$88); }; });
    var jsfun3$89 =
      _f(function (f$90) { return function (a1$91, a2$92, a3$93) { return caml_callback3(f$90, a1$91, a2$92, a3$93); }; });
    var jsfun4$94 =
      _f(function (f$95) {
           return function (a1$96, a2$97, a3$98, a4$99) { return caml_callback4(f$95, a1$96, a2$97, a3$98, a4$99); };
         });
    var jsfun5$100 =
      _f(function (f$101) {
           return function (a1$102, a2$103, a3$104, a4$105, a5$106) {
                    return caml_callback5(f$101, a1$102, a2$103, a3$104, a4$105, a5$106);
                  };
         });
    var Inline$288 = function () { var Jslib_ast$282 = $();
                                   var _loc$287 = 0;
                                   return $(Jslib_ast$282, _loc$287); }();
    return $(option_of_nullable$74, nullable_of_option$76, is_null$79, 
           jsfun$82, jsfun2$85, jsfun3$89, jsfun4$94, jsfun5$100, Inline$288);
  }();
var oc$Dom$ = function () { var window$717 = window;
                            var document$718 = document;
                            return $(window$717, document$718); }();
var oc$Minesweeper$ =
  function () {
    var default_config$65 = $(10, 10, 15);
    var iter_on_cell$76 =
      _f(function (cf$77, f$78) {
           var i$79;
           for (i$79 = 0;
           i$79 <= cf$77[0] - 1;
           i$79++) {
             (function (i$79) {
                var j$80;
                for (j$80 = 0; j$80 <= cf$77[1] - 1; j$80++) { (function (j$80) { _(f$78, [$(i$79, j$80)]); }(j$80)); }
              }(i$79));
           }
         });
    var random_list_mines$81 =
      _f(function (lc$82, m$83) {
           var cell_list$84 = 0;
           while (_(oc$List$[0], [cell_list$84]) < m$83)
           {
             var n$85 = _(oc$Random$[4], [lc$82]);
             if (!_(oc$List$[23], [n$85, cell_list$84])) cell_list$84 = $(n$85, cell_list$84); else ;
           }
           return cell_list$84;
         });
    var generate_seed$86 =
      _f(function (param$296) { var t$87 = caml_sys_time(0);
                                var n$88 = t$87 * 1000.0;
                                return __(oc$Random$[0], [n$88 % 100000]); });
    var valid$89 =
      _f(function (cf$90, param$295) {
           var j$92 = param$295[1];
           var i$91 = param$295[0];
           return i$91 >= 0 && (i$91 < cf$90[0] && (j$92 >= 0 && j$92 < cf$90[1]));
         });
    var neighbours$93 =
      _f(function (cf$94, param$294) {
           var y$96 = param$294[1];
           var x$95 = param$294[0];
           var ngb$97 =
             $($(x$95 - 1, y$96 - 1),
             $($(x$95 - 1, y$96),
             $($(x$95 - 1, y$96 + 1),
             $($(x$95, y$96 - 1),
             $($(x$95, y$96 + 1), $($(x$95 + 1, y$96 - 1), $($(x$95 + 1, y$96), $($(x$95 + 1, y$96 + 1), 0))))))));
           return __(oc$List$[26], [_(valid$89, [cf$94]), ngb$97]);
         });
    var initialize_board$98 =
      _f(function (cf$99) {
           var cell_init$100 = _f(function (param$292) { return $(0, 0, 0, 0); });
           var copy_cell_init$101 =
             _f(function (b$102, param$291) {
                  return oc$$asets(oc$$arefs(b$102, param$291[0]), param$291[1], _(cell_init$100, [0]));
                });
           var set_mined$105 =
             _f(function (b$106, n$107) { return oc$$arefs(oc$$arefs(b$106, n$107 / cf$99[1] >> 0), n$107 % cf$99[1])[0] = 1; });
           var count_mined_adj$108 =
             _f(function (b$109, param$289) {
                  var x$112 = $(0);
                  var inc_if_mined$113 =
                    _f(function (param$290) {
                         if (oc$$arefs(oc$$arefs(b$109, param$290[0]), param$290[1])[0]) return x$112[0]++;
                         return 0;
                       });
                  _(oc$List$[9], [inc_if_mined$113, _(neighbours$93, [cf$99, $(param$289[0], param$289[1])])]);
                  return x$112[0];
                });
           var set_count$116 =
             _f(function (b$117, param$288) {
                  var j$119 = param$288[1];
                  var i$118 = param$288[0];
                  if (!oc$$arefs(oc$$arefs(b$117, i$118), j$119)[0])
                  return oc$$arefs(oc$$arefs(b$117, i$118), j$119)[3] = _(count_mined_adj$108, [b$117, $(i$118, j$119)]);
                  return 0;
                });
           var list_mined$120 = _(random_list_mines$81, [cf$99[0] * cf$99[1], cf$99[2]]);
           var board$121 = _(oc$Array$[1], [cf$99[0], cf$99[1], _(cell_init$100, [0])]);
           _(iter_on_cell$76, [cf$99, _(copy_cell_init$101, [board$121])]);
           _(oc$List$[9], [_(set_mined$105, [board$121]), list_mined$120]);
           _(iter_on_cell$76, [cf$99, _(set_count$116, [board$121])]);
           return board$121;
         });
    var cells_to_see$122 =
      _f(function (bd$123, cf$124, param$283) {
           var j$126 = param$283[1];
           var i$125 = param$283[0];
           var visited$127 = _(oc$Array$[1], [cf$124[0], cf$124[1], 0]);
           var relevant$128 =
             _f(function (param$286) {
                  if (param$286)
                  {
                    var l$132 = param$286[1];
                    var c$131 = param$286[0];
                    var y$130 = c$131[1];
                    var x$129 = c$131[0];
                    var cell$133 = oc$$arefs(oc$$arefs(bd$123, x$129), y$130);
                    if (cell$133[0] || (cell$133[2] || (cell$133[1] || oc$$arefs(oc$$arefs(visited$127, x$129), y$130))))
                    return __(relevant$128, [l$132]);
                    var match$287 = _(relevant$128, [l$132]);
                    var l2$135 = match$287[1];
                    var l1$134 = match$287[0];
                    oc$$asets(oc$$arefs(visited$127, x$129), y$130, 1);
                    if (cell$133[3] === 0) return $(l1$134, $(c$131, l2$135));
                    return $($(c$131, l1$134), l2$135);
                  }
                  return $(0, 0);
                });
           var cells_to_see_rec$136 =
             _f(function (param$284) {
                  if (param$284)
                  {
                    var l$140 = param$284[1];
                    var c$139 = param$284[0];
                    if (oc$$arefs(oc$$arefs(bd$123, c$139[0]), c$139[1])[3] !== 0)
                    return $(c$139, _(cells_to_see_rec$136, [l$140]));
                    var match$285 = _(relevant$128, [_(neighbours$93, [cf$124, c$139])]);
                    return __(oc$Pervasives$[21],
                           [$(c$139, match$285[0]), _(cells_to_see_rec$136, [_(oc$Pervasives$[21], [match$285[1], l$140])])]);
                  }
                  return 0;
                });
           oc$$asets(oc$$arefs(visited$127, i$125), j$126, 1);
           return __(cells_to_see_rec$136, [$($(i$125, j$126), 0)]);
         });
    var b0$143 = 3;
    var l1$144 = 15;
    var l4$146 = 20 + 2 * b0$143;
    var l3$147 = l4$146 * default_config$65[0] + 2 * b0$143;
    var l5$148 = 40 + 2 * b0$143;
    var h2$150 = 30;
    var h3$151 = l5$148 + 20 + 2 * b0$143;
    var h5$153 = 20 + 2 * b0$143;
    var h6$154 = l5$148 + 2 * b0$143;
    var draw_cell$168 =
      _f(function (dom$169, bd$170) {
           return dom$169.src =
                  bd$170[2] ? "sprites/flag.png" :
                  bd$170[0] ? "sprites/bomb.png" :
                  bd$170[1] ?
                  bd$170[3] === 0 ? "sprites/empty.png" :
                  _(oc$Pervasives$[15], ["sprites/", _(oc$Pervasives$[15], [_(oc$Pervasives$[19], [bd$170[3]]), ".png"])]) :
                  "sprites/normal.png";
         });
    var draw_board$171 =
      _f(function (d$172) {
           var y$173;
           for (y$173 = 0;
           y$173 <= d$172[2][1] - 1;
           y$173++) {
             (function (y$173) {
                var x$174;
                for (x$174 = 0;
                x$174 <= d$172[2][0] - 1;
                x$174++) {
                  (function (x$174) {
                     _(draw_cell$168, [oc$$arefs(oc$$arefs(d$172[1], y$173), x$174), oc$$arefs(oc$$arefs(d$172[0], x$174), y$173)]);
                   }(x$174));
                }
              }(y$173));
           }
         });
    var disable_events$175 =
      _f(function (d$176) {
           var y$177;
           for (y$177 = 0;
           y$177 <= d$176[2][1] - 1;
           y$177++) {
             (function (y$177) {
                var x$178;
                for (x$178 = 0;
                x$178 <= d$176[2][0] - 1;
                x$178++) {
                  (function (x$178) {
                     (oc$$arefs(oc$$arefs(d$176[1], y$177), x$178)).onclick =
                     _(oc$Ocamljs$[3],
                     [_f(function (param$282) {
                           (function () { var v$300 = oc$Dom$[0];
                                          return _m(v$300.alert, v$300, ["GAME OVER"]); }());
                           return 0;
                         })]);
                   }(x$178));
                }
              }(y$177));
           }
         });
    var mark_cell$179 =
      _f(function (d$180, i$181, j$182) {
           if (oc$$arefs(oc$$arefs(d$180[0], i$181), j$182)[2])
           {
             d$180[3] = d$180[3] - 1;
             oc$$arefs(oc$$arefs(d$180[0], i$181), j$182)[2] = 0;
           }
           else {
             d$180[3] = d$180[3] + 1;
             oc$$arefs(oc$$arefs(d$180[0], i$181), j$182)[2] = 1;
           }
           return __(draw_cell$168, [oc$$arefs(oc$$arefs(d$180[1], j$182), i$181), oc$$arefs(oc$$arefs(d$180[0], i$181), j$182)]);
         });
    var reveal$183 =
      _f(function (d$184, i$185, j$186) {
           var reveal_cell$187 =
             _f(function (param$281) {
                  var j$189 = param$281[1];
                  var i$188 = param$281[0];
                  oc$$arefs(oc$$arefs(d$184[0], i$188), j$189)[1] = 1;
                  _(draw_cell$168, [oc$$arefs(oc$$arefs(d$184[1], j$189), i$188), oc$$arefs(oc$$arefs(d$184[0], i$188), j$189)]);
                  return d$184[4] = d$184[4] - 1;
                });
           _(oc$List$[9], [reveal_cell$187, _(cells_to_see$122, [d$184[0], d$184[2], $(i$185, j$186)])]);
           if (d$184[4] === 0)
           {
             _(draw_board$171, [d$184]);
             _(disable_events$175, [d$184]);
             return function () { var v$299 = oc$Dom$[0];
                                  return __m(v$299.alert, v$299, ["YOU WIN"]); }();
           }
           return 0;
         });
    var create_demin$190 =
      _f(function (nb_c$191, nb_r$192, nb_m$193) {
           var nbc$194 = _(oc$Pervasives$[4], [default_config$65[0], nb_c$191]);
           var nbr$195 = _(oc$Pervasives$[4], [default_config$65[1], nb_r$192]);
           var nbm$196 = _(oc$Pervasives$[3], [nbc$194 * nbr$195, _(oc$Pervasives$[4], [1, nb_m$193])]);
           var cf$197 = $(nbc$194, nbr$195, nbm$196);
           _(generate_seed$86, [0]);
           return $(_(initialize_board$98, [cf$197]), caml_make_vect(nbr$195, $()), 
                  cf$197, 0, cf$197[1] * cf$197[0] - cf$197[2], 0);
         });
    var init_table$203 =
      _f(function (d$204, div$205) {
           var dd$206 = oc$Dom$[1];
           var board_div$207 = _m(dd$206.getElementById, dd$206, [div$205]);
           var mode$208 = $(0);
           var buf$209 = _m(dd$206.createDocumentFragment, dd$206, []);
           _m(buf$209.appendChild, buf$209, [_m(dd$206.createTextNode, dd$206, ["Mode : "])]);
           ;
           var img$210 = _m(dd$206.createElement, dd$206, ["img"]);
           _m(buf$209.appendChild, buf$209, [img$210]);
           ;
           img$210.src = "sprites/bomb.png";
           img$210.onclick =
           _(oc$Ocamljs$[3],
           [_f(function (param$277) {
                 var match$278 = mode$208[0];
                 if (match$278 !== 0)
                 {
                   mode$208[0] = 0;
                   img$210.src = "sprites/bomb.png";
                 }
                 else {
                   mode$208[0] = 1;
                   img$210.src = "sprites/flag.png";
                 }
                 return 0;
               })]);
           _m(buf$209.appendChild, buf$209, [_m(dd$206.createElement, dd$206, ["br"])]);
           ;
           var y$211;
           for (y$211 = 0;
           y$211 <= d$204[2][1] - 1;
           y$211++) {
             (function (y$211) {
                var imgs$212 = 0;
                var x$213;
                for (x$213 = 0;
                x$213 <= d$204[2][0] - 1;
                x$213++) {
                  (function (x$213) {
                     var img$214 = _m(dd$206.createElement, dd$206, ["img"]);
                     imgs$212 = $(img$214, imgs$212);
                     img$214.src = "sprites/normal.png";
                     img$214.onclick =
                     _(oc$Ocamljs$[3],
                     [_f(function (param$275) {
                           var match$276 = mode$208[0];
                           if (match$276 !== 0)
                           {
                             oc$$arefs(oc$$arefs(d$204[0], x$213), y$211)[2] = !oc$$arefs(oc$$arefs(d$204[0], x$213), y$211)[2];
                             _(draw_cell$168, [img$214, oc$$arefs(oc$$arefs(d$204[0], x$213), y$211)]);
                           }
                           else if (oc$$arefs(oc$$arefs(d$204[0], x$213), y$211)[1])
                                ;
                                else if (d$204[5])
                                     _(mark_cell$179, [d$204, x$213, y$211]);
                                     else if (oc$$arefs(oc$$arefs(d$204[0], x$213), y$211)[2])
                                          ;
                                          else if (oc$$arefs(oc$$arefs(d$204[0], x$213), y$211)[0])
                                               {
                                                 _(draw_board$171, [d$204]);
                                                 _(disable_events$175, [d$204]);
                                                 (function () {
                                                    var v$298 = oc$Dom$[0];
                                                    return _m(v$298.alert, v$298, ["YOU LOSE"]);
                                                  }());
                                               }
                                               else _(reveal$183, [d$204, x$213, y$211]);
                           return 0;
                         })]);
                     _m(buf$209.appendChild, buf$209, [img$214]);
                     ;
                   }(x$213));
                }
                _m(buf$209.appendChild, buf$209, [_m(dd$206.createElement, dd$206, ["br"])]);
                ;
                oc$$asets(d$204[1], y$211, _(oc$Array$[10], [_(oc$List$[4], [imgs$212])]));
              }(y$211));
           }
           board_div$207.style.lineHeight = "0";
           _m(board_div$207.appendChild, board_div$207, [buf$209]);
           return 0;
         });
    var run$215 =
      _f(function (div$216, nbc$217, nbr$218, nbm$219) {
           var match$274 =
             function () {
               try {
                 return $(div$216, caml_int_of_string(nbc$217), caml_int_of_string(nbr$218), caml_int_of_string(nbm$219));
               } catch (exn$273) {
                 return $("board", 10, 10, 20);
               }
             }();
           var d$224 = _(create_demin$190, [match$274[1], match$274[2], match$274[3]]);
           return __(init_table$203, [d$224, match$274[0]]);
         });
    return $(default_config$65, iter_on_cell$76, random_list_mines$81, 
           generate_seed$86, valid$89, neighbours$93, initialize_board$98, 
           cells_to_see$122, b0$143, l1$144, l1$144, l4$146, l3$147, 
           l5$148, l1$144, h2$150, h3$151, h2$150, h5$153, h6$154, draw_cell$168, 
           draw_board$171, disable_events$175, mark_cell$179, reveal$183, 
           create_demin$190, init_table$203, run$215);
  }();
var oc$Main$ =
  function () {
    var int_input$58 =
      _f(function (name$59, value$60) {
           var d$61 = oc$Dom$[1];
           var res$62 = _m(d$61.createDocumentFragment, d$61, []);
           _m(res$62.appendChild, res$62, [_m(d$61.createTextNode, d$61, [name$59])]);
           ;
           var input$63 = _m(d$61.createElement, d$61, ["input"]);
           _m(input$63.setAttribute, input$63, ["type", "text"]);
           input$63.value = _(oc$Pervasives$[19], [value$60[0]]);
           input$63.onchange =
           _(oc$Ocamljs$[3],
           [_f(function (param$91) {
                 value$60[0] =
                 function () { try { return caml_int_of_string(input$63.value); } catch (exn$92) { return value$60[0]; } }();
                 return input$63.value = _(oc$Pervasives$[19], [value$60[0]]);
               })]);
           _m(res$62.appendChild, res$62, [input$63]);
           ;
           return res$62;
         });
    var button$64 =
      _f(function (name$65, callback$66) {
           var d$67 = oc$Dom$[1];
           var res$68 = _m(d$67.createDocumentFragment, d$67, []);
           var input$69 = _m(d$67.createElement, d$67, ["input"]);
           _m(input$69.setAttribute, input$69, ["type", "submit"]);
           input$69.value = name$65;
           input$69.onclick = _(oc$Ocamljs$[3], [callback$66]);
           _m(res$68.appendChild, res$68, [input$69]);
           ;
           return res$68;
         });
    var div$70 =
      _f(function (id$71) {
           var div$72 = function () { var v$93 = oc$Dom$[1];
                                      return _m(v$93.createElement, v$93, ["div"]); }();
           _m(div$72.setAttribute, div$72, ["id", id$71]);
           return div$72;
         });
    var uid$73 =
      function () {
        var uid$74 = $(0);
        return _f(function (param$90) {
                    uid$74[0]++;
                    return __(oc$Pervasives$[15], ["caml__", _(oc$Pervasives$[19], [uid$74[0]])]);
                  });
      }();
    var onload$75 =
      _f(function (param$87) {
           var d$76 = oc$Dom$[1];
           var main$77 = _m(d$76.getElementById, d$76, ["main"]);
           var match$89 = $($(10), $(12), $(15));
           var nbm$80 = match$89[2];
           var nbc$79 = match$89[1];
           var nbr$78 = match$89[0];
           _m(main$77.appendChild, main$77, [_(int_input$58, ["Number of columns", nbr$78])]);
           ;
           _m(main$77.appendChild, main$77, [_m(d$76.createElement, d$76, ["br"])]);
           ;
           _m(main$77.appendChild, main$77, [_(int_input$58, ["Number of rows", nbc$79])]);
           ;
           _m(main$77.appendChild, main$77, [_m(d$76.createElement, d$76, ["br"])]);
           ;
           _m(main$77.appendChild, main$77, [_(int_input$58, ["Number of mines", nbm$80])]);
           ;
           _m(main$77.appendChild, main$77, [_m(d$76.createElement, d$76, ["br"])]);
           ;
           _m(main$77.appendChild, main$77,
           [_(button$64,
            ["nouvelle partie",
            _f(function (param$88) {
                 var id$81 = _(uid$73, [0]);
                 _m(main$77.appendChild, main$77, [_(div$70, [id$81])]);
                 ;
                 _(oc$Minesweeper$[27],
                 [id$81, _(oc$Pervasives$[19], [nbc$79[0]]), _(oc$Pervasives$[19], [nbr$78[0]]),
                 _(oc$Pervasives$[19], [nbm$80[0]])]);
                 return 0;
               })])]);
           return 0;
         });
    (oc$Dom$[0]).onload = _(oc$Ocamljs$[3], [onload$75]);
    return $(int_input$58, button$64, div$70, uid$73, onload$75);
  }();
var oc$Std_exit$ = (_(oc$Pervasives$[80], [0]), $());
return caml_named_value;
})();
