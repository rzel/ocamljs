// compiled by ocamlc 3.10.2, ocamljs 0.1
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
 * Copyright (C) 2007 Skydeck, Inc
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
 * Copyright (C) 2007 Skydeck, Inc
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
    var failwith$38 = _f(function (s$39) { throw $(Failure$19g, s$39); });
    var invalid_arg$40 = _f(function (s$41) { throw $(Invalid_argument$18g, s$41); });
    var Exit$42 = $("Pervasives.Exit");
    var min$50 = _f(function (x$51, y$52) { if (caml_lessequal(x$51, y$52)) return x$51;
                                            return y$52; });
    var max$53 = _f(function (x$54, y$55) { if (caml_greaterequal(x$54, y$55)) return x$54;
                                            return y$55; });
    var abs$71 = _f(function (x$72) { if (x$72 >= 0) return x$72;
                                      return -x$72; });
    var lnot$76 = _f(function (x$77) { return x$77 ^ -1; });
    var min_int$81 = 1 << (1 << 31 === 0 ? 30 : 62);
    var max_int$82 = min_int$81 - 1;
    var infinity$115 = caml_int64_float_of_bits("9218868437227405312");
    var neg_infinity$116 = caml_int64_float_of_bits("-4503599627370496");
    var nan$117 = caml_int64_float_of_bits("9218868437227405313");
    var max_float$118 = caml_int64_float_of_bits("9218868437227405311");
    var min_float$119 = caml_int64_float_of_bits("4503599627370496");
    var epsilon_float$120 = caml_int64_float_of_bits("4372995238176751616");
    var $5E$136 =
      _f(function (s1$137, s2$138) {
           var l1$139 = s1$137.length;
           var l2$140 = s2$138.length;
           var s$141 = oc$$cms(l1$139 + l2$140);
           caml_blit_string(s1$137, 0, s$141, 0, l1$139);
           caml_blit_string(s2$138, 0, s$141, l1$139, l2$140);
           return s$141;
         });
    var char_of_int$144 =
      _f(function (n$145) { if (n$145 < 0 || n$145 > 255) return __(invalid_arg$40, ["char_of_int"]);
                            return n$145; });
    var string_of_bool$151 = _f(function (b$152) { if (b$152) return "true";
                                                   return "false"; });
    var bool_of_string$153 =
      _f(function (param$415) {
           if (!oc$$sneq(param$415, "false")) return 0;
           if (oc$$sneq(param$415, "true")) return __(invalid_arg$40, ["bool_of_string"]);
           return 1;
         });
    var string_of_int$154 = _f(function (n$155) { return caml_format_int("%d", n$155); });
    var String$158 = $();
    var valid_float_lexem$159 =
      _f(function (s$160) {
           var l$161 = s$160.length;
           var loop$162 =
             _f(function (i$163) {
                  if (i$163 >= l$161) return __($5E$136, [s$160, "."]);
                  var match$414 = oc$$srefs(s$160, i$163);
                  var $r58 = false;
                  r$58: {
                    if (!(match$414 >= 48)) { if (!(match$414 !== 45)) { $r58 = true;
                                                                    break r$58; }
                                              return s$160; }
                    if (!(match$414 >= 58)) { $r58 = true;
                                              break r$58; }
                    return s$160;
                  }
                  if ($r58) return __(loop$162, [i$163 + 1]);
                });
           return __(loop$162, [0]);
         });
    var string_of_float$164 = _f(function (f$165) { return __(valid_float_lexem$159, [oc$$sprintf("%.12g", f$165)]); });
    var $40$167 =
      _f(function (l1$168, l2$169) { if (l1$168) return $(l1$168[0], _($40$167, [l1$168[1], l2$169]));
                                     return l2$169; });
    var stdin$176 = caml_ml_open_descriptor_in(0);
    var stdout$177 = caml_ml_open_descriptor_out(1);
    var stderr$178 = caml_ml_open_descriptor_out(2);
    var open_out_gen$199 =
      _f(function (mode$200, perm$201, name$202) {
           return caml_ml_open_descriptor_out(caml_sys_open(name$202, mode$200, perm$201));
         });
    var open_out$203 = _f(function (name$204) { return __(open_out_gen$199, [$(1, $(3, $(4, $(7, 0)))), 438, name$204]); });
    var open_out_bin$205 = _f(function (name$206) { return __(open_out_gen$199, [$(1, $(3, $(4, $(6, 0)))), 438, name$206]); });
    var flush_all$209 =
      _f(function (param$411) {
           var iter$210 =
             _f(function (param$412) {
                  if (param$412)
                  {
                    try { caml_ml_flush(param$412[0]); } catch (exn$413) { ; }
                    return __(iter$210, [param$412[1]]);
                  }
                  return 0;
                });
           return __(iter$210, [caml_ml_out_channels_list(0)]);
         });
    var output_string$215 = _f(function (oc$216, s$217) { return caml_ml_output(oc$216, s$217, 0, s$217.length); });
    var output$218 =
      _f(function (oc$219, s$220, ofs$221, len$222) {
           if (ofs$221 < 0 || (len$222 < 0 || ofs$221 > s$220.length - len$222)) return __(invalid_arg$40, ["output"]);
           return caml_ml_output(oc$219, s$220, ofs$221, len$222);
         });
    var output_value$226 = _f(function (chan$227, v$228) { return caml_output_value(chan$227, v$228, 0); });
    var close_out$233 = _f(function (oc$234) { caml_ml_flush(oc$234);
                                               return caml_ml_close_channel(oc$234); });
    var close_out_noerr$235 =
      _f(function (oc$236) {
           try { caml_ml_flush(oc$236); } catch (exn$410) { ; }
           try { return caml_ml_close_channel(oc$236); } catch (exn$409) { return 0; }
         });
    var open_in_gen$238 =
      _f(function (mode$239, perm$240, name$241) {
           return caml_ml_open_descriptor_in(caml_sys_open(name$241, mode$239, perm$240));
         });
    var open_in$242 = _f(function (name$243) { return __(open_in_gen$238, [$(0, $(7, 0)), 0, name$243]); });
    var open_in_bin$244 = _f(function (name$245) { return __(open_in_gen$238, [$(0, $(6, 0)), 0, name$245]); });
    var input$248 =
      _f(function (ic$249, s$250, ofs$251, len$252) {
           if (ofs$251 < 0 || (len$252 < 0 || ofs$251 > s$250.length - len$252)) return __(invalid_arg$40, ["input"]);
           return caml_ml_input(ic$249, s$250, ofs$251, len$252);
         });
    var unsafe_really_input$253 =
      _f(function (ic$254, s$255, ofs$256, len$257) {
           if (len$257 <= 0) return 0;
           var r$258 = caml_ml_input(ic$254, s$255, ofs$256, len$257);
           if (r$258 === 0) throw $(End_of_file$22g);
           return __(unsafe_really_input$253, [ic$254, s$255, ofs$256 + r$258, len$257 - r$258]);
         });
    var really_input$259 =
      _f(function (ic$260, s$261, ofs$262, len$263) {
           if (ofs$262 < 0 || (len$263 < 0 || ofs$262 > s$261.length - len$263)) return __(invalid_arg$40, ["really_input"]);
           return __(unsafe_really_input$253, [ic$260, s$261, ofs$262, len$263]);
         });
    var input_line$265 =
      _f(function (chan$266) {
           var build_result$267 =
             _f(function (buf$268, pos$269, param$408) {
                  if (param$408)
                  {
                    var hd$270 = param$408[0];
                    var len$272 = hd$270.length;
                    caml_blit_string(hd$270, 0, buf$268, pos$269 - len$272, len$272);
                    return __(build_result$267, [buf$268, pos$269 - len$272, param$408[1]]);
                  }
                  return buf$268;
                });
           var scan$273 =
             _f(function (accu$274, len$275) {
                  var n$276 = caml_ml_input_scan_line(chan$266);
                  if (!(n$276 === 0))
                  {
                    if (n$276 > 0)
                    {
                      var res$277 = oc$$cms(n$276 - 1);
                      caml_ml_input(chan$266, res$277, 0, n$276 - 1);
                      ;
                      caml_ml_input_char(chan$266);
                      ;
                      if (accu$274)
                      {
                        var len$278 = len$275 + n$276 - 1;
                        return __(build_result$267, [oc$$cms(len$278), len$278, $(res$277, accu$274)]);
                      }
                      return res$277;
                    }
                    var beg$279 = oc$$cms(-n$276);
                    caml_ml_input(chan$266, beg$279, 0, -n$276);
                    ;
                    return __(scan$273, [$(beg$279, accu$274), len$275 - n$276]);
                  }
                  if (accu$274) return __(build_result$267, [oc$$cms(len$275), len$275, accu$274]);
                  throw $(End_of_file$22g);
                });
           return __(scan$273, [0, 0]);
         });
    var close_in_noerr$287 = _f(function (ic$288) { try { return caml_ml_close_channel(ic$288); } catch (exn$407) { return 0; } });
    var print_char$290 = _f(function (c$291) { return caml_ml_output_char(stdout$177, c$291); });
    var print_string$292 = _f(function (s$293) { return __(output_string$215, [stdout$177, s$293]); });
    var print_int$294 = _f(function (i$295) { return __(output_string$215, [stdout$177, _(string_of_int$154, [i$295])]); });
    var print_float$296 = _f(function (f$297) { return __(output_string$215, [stdout$177, _(string_of_float$164, [f$297])]); });
    var print_endline$298 =
      _f(function (s$299) {
           _(output_string$215, [stdout$177, s$299]);
           caml_ml_output_char(stdout$177, 10);
           return caml_ml_flush(stdout$177);
         });
    var print_newline$300 = _f(function (param$406) { caml_ml_output_char(stdout$177, 10);
                                                      return caml_ml_flush(stdout$177); });
    var prerr_char$301 = _f(function (c$302) { return caml_ml_output_char(stderr$178, c$302); });
    var prerr_string$303 = _f(function (s$304) { return __(output_string$215, [stderr$178, s$304]); });
    var prerr_int$305 = _f(function (i$306) { return __(output_string$215, [stderr$178, _(string_of_int$154, [i$306])]); });
    var prerr_float$307 = _f(function (f$308) { return __(output_string$215, [stderr$178, _(string_of_float$164, [f$308])]); });
    var prerr_endline$309 =
      _f(function (s$310) {
           _(output_string$215, [stderr$178, s$310]);
           caml_ml_output_char(stderr$178, 10);
           return caml_ml_flush(stderr$178);
         });
    var prerr_newline$311 = _f(function (param$405) { caml_ml_output_char(stderr$178, 10);
                                                      return caml_ml_flush(stderr$178); });
    var read_line$312 = _f(function (param$404) { caml_ml_flush(stdout$177);
                                                  return __(input_line$265, [stdin$176]); });
    var read_int$313 = _f(function (param$403) { return caml_int_of_string(_(read_line$312, [0])); });
    var read_float$314 = _f(function (param$402) { return caml_float_of_string(_(read_line$312, [0])); });
    var LargeFile$321 = $();
    var $5E$5E$336 = _f(function (fmt1$337, fmt2$338) { return _($5E$136, [fmt1$337, fmt2$338]); });
    var string_of_format$339 =
      _f(function (fmt$340) {
           var s$341 = fmt$340;
           var l$342 = s$341.length;
           var r$343 = oc$$cms(l$342);
           caml_blit_string(s$341, 0, r$343, 0, l$342);
           return r$343;
         });
    var exit_function$345 = $(flush_all$209);
    var at_exit$346 =
      _f(function (f$347) {
           var g$348 = exit_function$345[0];
           return exit_function$345[0] = _f(function (param$401) { _(f$347, [0]);
                                                                   return __(g$348, [0]); });
         });
    var do_at_exit$349 = _f(function (param$400) { return __(exit_function$345[0], [0]); });
    var exit$350 = _f(function (retcode$351) { _(do_at_exit$349, [0]);
                                               return caml_sys_exit(retcode$351); });
    caml_register_named_value("Pervasives.do_at_exit", do_at_exit$349);
    return $(invalid_arg$40, failwith$38, Exit$42, min$50, max$53, abs$71, 
           max_int$82, min_int$81, lnot$76, infinity$115, neg_infinity$116, 
           nan$117, max_float$118, min_float$119, epsilon_float$120, 
           $5E$136, char_of_int$144, string_of_bool$151, bool_of_string$153, 
           string_of_int$154, string_of_float$164, $40$167, stdin$176, 
           stdout$177, stderr$178, print_char$290, print_string$292, 
           print_int$294, print_float$296, print_endline$298, print_newline$300, 
           prerr_char$301, prerr_string$303, prerr_int$305, prerr_float$307, 
           prerr_endline$309, prerr_newline$311, read_line$312, read_int$313, 
           read_float$314, open_out$203, open_out_bin$205, open_out_gen$199,
           _f(function (prim$368) { return caml_ml_flush(prim$368); }), 
           flush_all$209, _f(function (prim$370, prim$369) { return caml_ml_output_char(prim$370, prim$369); }), 
           output_string$215, output$218, _f(function (prim$372, prim$371) { return caml_ml_output_char(prim$372, prim$371); }),
           _f(function (prim$374, prim$373) { return caml_ml_output_int(prim$374, prim$373); }), 
           output_value$226, _f(function (prim$376, prim$375) { return caml_ml_seek_out(prim$376, prim$375); }),
           _f(function (prim$377) { return caml_ml_pos_out(prim$377); }),
           _f(function (prim$378) { return caml_ml_channel_size(prim$378); }), 
           close_out$233, close_out_noerr$235,
           _f(function (prim$380, prim$379) { return caml_ml_set_binary_mode(prim$380, prim$379); }), 
           open_in$242, open_in_bin$244, open_in_gen$238, _f(function (prim$381) { return caml_ml_input_char(prim$381); }),
           input_line$265, input$248, really_input$259, _f(function (prim$382) { return caml_ml_input_char(prim$382); }),
           _f(function (prim$383) { return caml_ml_input_int(prim$383); }),
           _f(function (prim$384) { return caml_input_value(prim$384); }),
           _f(function (prim$386, prim$385) { return caml_ml_seek_in(prim$386, prim$385); }),
           _f(function (prim$387) { return caml_ml_pos_in(prim$387); }),
           _f(function (prim$388) { return caml_ml_channel_size(prim$388); }),
           _f(function (prim$389) { return caml_ml_close_channel(prim$389); }), 
           close_in_noerr$287, _f(function (prim$391, prim$390) { return caml_ml_set_binary_mode(prim$391, prim$390); }),
           $(_f(function (prim$393, prim$392) { return caml_ml_seek_out_64(prim$393, prim$392); }),
           _f(function (prim$394) { return caml_ml_pos_out_64(prim$394); }),
           _f(function (prim$395) { return caml_ml_channel_size_64(prim$395); }),
           _f(function (prim$397, prim$396) { return caml_ml_seek_in_64(prim$397, prim$396); }),
           _f(function (prim$398) { return caml_ml_pos_in_64(prim$398); }),
           _f(function (prim$399) { return caml_ml_channel_size_64(prim$399); })), 
           string_of_format$339, $5E$5E$336, exit$350, at_exit$346, valid_float_lexem$159, 
           unsafe_really_input$253, do_at_exit$349);
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
var oc$Dom$ = function () { var window$696 = window;
                            var document$697 = document;
                            return $(window$696, document$697); }();
var oc$Canvas$ =
  function () {
    var D$58 = oc$Dom$;
    var onload$59 =
      _f(function (param$168) {
           var canvas$60 = function () { var v$169 = D$58[1];
                                         return _m(v$169.getElementById, v$169, ["canvas"]); }();
           var ctx$61 = _m(canvas$60.getContext, canvas$60, ["2d"]);
           ctx$61.fillStyle = "rgb(200,0,0)";
           _m(ctx$61.fillRect, ctx$61, [10., 10., 55., 50.]);
           ctx$61.fillStyle = "rgba(0,0,200,0.5)";
           _m(ctx$61.fillRect, ctx$61, [30., 30., 55., 50.]);
           _m(ctx$61.beginPath, ctx$61, []);
           _m(ctx$61.moveTo, ctx$61, [75., 25.]);
           _m(ctx$61.quadraticCurveTo, ctx$61, [25., 25., 25., 62.5]);
           _m(ctx$61.quadraticCurveTo, ctx$61, [25., 100., 50., 100.]);
           _m(ctx$61.quadraticCurveTo, ctx$61, [50., 120., 30., 125.]);
           _m(ctx$61.quadraticCurveTo, ctx$61, [60., 120., 65., 100.]);
           _m(ctx$61.quadraticCurveTo, ctx$61, [125., 100., 125., 62.5]);
           _m(ctx$61.quadraticCurveTo, ctx$61, [125., 25., 75., 25.]);
           return __m(ctx$61.stroke, ctx$61, []);
         });
    (D$58[0]).onload = _(oc$Ocamljs$[3], [onload$59]);
    return $(D$58, onload$59);
  }();
var oc$Std_exit$ = (_(oc$Pervasives$[80], [0]), $());
return caml_named_value;
})();