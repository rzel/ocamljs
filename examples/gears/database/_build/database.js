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
// Copyright 2007, Google Inc.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//  3. Neither the name of Google Inc. nor the names of its contributors may be
//     used to endorse or promote products derived from this software without
//     specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Sets up google.gears.*, which is *the only* supported way to access Gears.
//
// Circumvent this file at your own risk!
//
// In the future, Gears may automatically define google.gears.* without this
// file. Gears may use these objects to transparently fix bugs and compatibility
// issues. Applications that use the code below will continue to work seamlessly
// when that happens.

(function() {
  // We are already defined. Hooray!
  if (window.google && google.gears) {
    return;
  }

  var factory = null;

  // Firefox
  if (typeof GearsFactory != 'undefined') {
    factory = new GearsFactory();
  } else {
    // IE
    try {
      factory = new ActiveXObject('Gears.Factory');
      // privateSetGlobalObject is only required and supported on IE Mobile on
      // WinCE.
      if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
        factory.privateSetGlobalObject(this);
      }
    } catch (e) {
      // Safari
      if ((typeof navigator.mimeTypes != 'undefined')
           && navigator.mimeTypes["application/x-googlegears"]) {
        factory = document.createElement("object");
        factory.style.display = "none";
        factory.width = 0;
        factory.height = 0;
        factory.type = "application/x-googlegears";
        document.documentElement.appendChild(factory);
      }
    }
  }

  // *Do not* define any objects if Gears is not installed. This mimics the
  // behavior of Gears defining the objects in the future.
  if (!factory) {
    return;
  }

  // Now set up the objects, being careful not to overwrite anything.
  //
  // Note: In Internet Explorer for Windows Mobile, you can't add properties to
  // the window object. However, global objects are automatically added as
  // properties of the window object in all browsers.
  if (!window.google) {
    google = {};
  }

  if (!google.gears) {
    google.gears = {factory: factory};
  }
})();
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
var oc$ArrayLabels$ =
  function () {
    var include$85 = oc$Array$;
    return $(include$85[0], include$85[1], include$85[2], include$85[3], 
           include$85[4], include$85[5], include$85[6], include$85[7], 
           include$85[8], include$85[9], include$85[10], include$85[11], 
           include$85[12], include$85[13], include$85[14], include$85[15], 
           include$85[16], include$85[17], include$85[18], include$85[19]);
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
var oc$Gears$ = function () { var factory$67 = google.gears.factory;
                              return $(factory$67); }();
var oc$Javascript$ =
  function () {
    var typeof$78 = _f(function (o$79) { return typeof o$79; });
    var true_$80 = true;
    var false_$81 = false;
    var new_Date$119 = _f(function (param$147) { return new Date(); });
    var Js_string$144 = $();
    var Math$146 = function () { var pi$145 = Math.PI;
                                 return $(pi$145); }();
    return $(typeof$78, true_$80, false_$81, new_Date$119, Js_string$144, Math$146);
  }();
var oc$Sample$ =
  function () {
    var isDefined$74 = _f(function (type_$75) { return oc$$sneq(type_$75, "undefined") && oc$$sneq(type_$75, "unknown"); });
    var childNodes$76 =
      _f(function (element$77) {
           if (_(isDefined$74, [typeof element$77.childNodes])) return element$77.childNodes;
           if (_(isDefined$74, [typeof element$77.children])) return element$77.children;
           throw $(Not_found$20g);
         });
    var getElementById$78 =
      _f(function (element_name$79) {
           if (_(isDefined$74, [typeof document.getElementById])) return document.getElementById(element_name$79);
           if (_(isDefined$74, [typeof document.all])) return document.all[element_name$79];
           throw $(Not_found$20g);
         });
    var setTextContent$80 =
      _f(function (elem$81, content$82) {
           if (_(isDefined$74, [typeof elem$81.innerText])) return elem$81.innerText = content$82;
           if (_(isDefined$74, [typeof elem$81.textContent])) return elem$81.textContent = content$82;
           throw $(Not_found$20g);
         });
    var setupSample$83 =
      _f(function (param$103) {
           if ((!window.google || !google.gears) &&
               function () {
                 var v$104 = oc$Dom$[0];
                 return _m(v$104.confirm, v$104, ["This demo requires Gears to be installed. Install now?"]);
               }())
           return (oc$Dom$[0]).location.href = "http://code.google.com/apis/gears/install.html";
           return 0;
         });
    var addStatus$84 =
      _f(function (clas$85, message$86) {
           var elm$87 = _(getElementById$78, ["status"]);
           if (!_(oc$Ocamljs$[2], [elm$87]))
           {
             var id$88 = _(oc$Pervasives$[15], ["statusEntry", _(oc$Pervasives$[19], [(_(childNodes$76, [elm$87])).length + 1])]);
             elm$87.innerHTML =
             _(oc$Pervasives$[15],
             [elm$87.innerHTML,
             clas$85 ?
             _(oc$Pervasives$[15],
             ["<span id=\"",
             _(oc$Pervasives$[15],
             [id$88, _(oc$Pervasives$[15], ["\" class=\"", _(oc$Pervasives$[15], [clas$85[0], "\"></span>"])])])]) :
             _(oc$Pervasives$[15], ["<span id=\"", _(oc$Pervasives$[15], [id$88, "\"></span>"])])]);
             elm$87.innerHTML = _(oc$Pervasives$[15], [elm$87.innerHTML, "<br>"]);
             return __(setTextContent$80, [_(getElementById$78, [id$88]), message$86]);
           }
           return 0;
         });
    var clearStatus$90 = _f(function (param$102) { var elm$91 = _(getElementById$78, ["status"]);
                                                   return elm$91.innerHTML = ""; });
    var setError$92 = _f(function (s$93) { _(clearStatus$90, [0]);
                                           return __(addStatus$84, [$("error"), s$93]); });
    _(setupSample$83, [0]);
    return $(isDefined$74, childNodes$76, getElementById$78, setTextContent$80, 
           setupSample$83, addStatus$84, clearStatus$90, setError$92);
  }();
var oc$Database$ =
  function () {
    var db$74 = $(null);
    var displayRecentPhrases$75 =
      _f(function (param$101) {
           var recentPhrases$76 = $("", "", "");
           var rs$77 =
             function () { var v$108 = db$74[0];
                           return _m(v$108.execute, v$108, ["select * from Demo order by Timestamp desc"]); }();
           var loop$78 =
             _f(function (i$79) {
                  if (_m(rs$77.isValidRow, rs$77, []))
                  {
                    if (i$79 < 3)
                    oc$$asets(recentPhrases$76, i$79, _m(rs$77.field, rs$77, [0]));
                    else {
                      (function () {
                         var v$107 = db$74[0];
                         return _m(v$107.execute, v$107, ["delete from Demo where Timestamp=?", $(_m(rs$77.field, rs$77, [1]))]);
                       }());
                      ;
                    }
                    _m(rs$77.next, rs$77, []);
                    return __(loop$78, [i$79 + 1]);
                  }
                  return 0;
                });
           _(loop$78, [0]);
           _m(rs$77.close, rs$77, []);
           var status$80 = _(oc$Sample$[2], ["status"]);
           status$80.innerHTML = "";
           return __(oc$ArrayLabels$[13],
                  [_f(function (i$81, rp$82) {
                        var id$83 = _(oc$Pervasives$[15], ["phrase", _(oc$Pervasives$[19], [i$81])]);
                        status$80.innerHTML =
                        _(oc$Pervasives$[15],
                        [status$80.innerHTML,
                        _(oc$Pervasives$[15], ["<span id=\"", _(oc$Pervasives$[15], [id$83, "\"></span><br>"])])]);
                        var bullet$84 =
                          _(oc$Pervasives$[15], ["(", _(oc$Pervasives$[15], [_(oc$Pervasives$[19], [i$81 + 1]), ")"])]);
                        return __(oc$Sample$[3], [_(oc$Sample$[2], [id$83]), _(oc$Pervasives$[15], [bullet$84, rp$82])]);
                      }),
                  recentPhrases$76]);
         });
    var init$85 =
      _f(function (param$100) {
           var success$86 =
             window.google && google.gears ?
             function () {
               try {
                 db$74[0] = function () { var v$106 = oc$Gears$[0];
                                          return _m(v$106.create, v$106, ["beta.database"]); }();
                 if (_(oc$Ocamljs$[2], [db$74[0]])) return 0;
                 (function () { var v$105 = db$74[0];
                                return _m(v$105.open, v$105, ["database-demo"]); }());
                 (function () {
                    var v$104 = db$74[0];
                    return _m(v$104.execute, v$104, ["create table if not exists Demo (Phrase varchar(255), Timestamp int)"]);
                  }());
                 ;
                 _(displayRecentPhrases$75, [0]);
                 return 1;
               } catch (ex$87) {
                 _(oc$Sample$[7], [_(oc$Pervasives$[15], ["Could not create database: ", ex$87.message])]);
                 return 0;
               }
             }() : 0;
           var inputs$88 = (_(oc$Sample$[2], ["form"])).elements;
           return __(oc$ArrayLabels$[11], [_f(function (el$89) { return el$89.disabled = !success$86; }), inputs$88]);
         });
    var handleSubmit$90 =
      _f(function (param$99) {
           var elm$91 = _(oc$Sample$[2], ["submitValue"]);
           var phrase$92 = elm$91.value;
           var currTime$93 = function () { var v$103 = _(oc$Javascript$[3], [0]);
                                           return _m(v$103.getTime, v$103, []); }();
           (function () {
              var v$102 = db$74[0];
              return _m(v$102.execute, v$102, ["insert into Demo values (?, ?)", $(phrase$92, currTime$93)]);
            }());
           ;
           elm$91.value = "";
           _(displayRecentPhrases$75, [0]);
           return false;
         });
    _(init$85, [0]);
    (oc$Dom$[0]).onload =
    _(oc$Ocamljs$[3],
    [_f(function (param$98) { return (_(oc$Sample$[2], ["form"])).onsubmit = _(oc$Ocamljs$[3], [handleSubmit$90]); })]);
    return $(db$74, displayRecentPhrases$75, init$85, handleSubmit$90);
  }();
var oc$Std_exit$ = (_(oc$Pervasives$[80], [0]), $());
return caml_named_value;
})();
