"use strict";

class Ahura {
   constructor(...args) {
      const ahura_conf = require(`${process.cwd()}/ahura_conf.json`);

      const caller_path_arr = this._getCaller().split('/');
      const caller_name = caller_path_arr[caller_path_arr.length - 1];

      const groups = args.length ? [...args, caller_name] : [caller_name];
      this._setFunctions(ahura_conf, groups);
   }

   _setFunctions(ahura_conf, groups) {
      groups.forEach(group => {
         if (!ahura_conf[group]) console.warn(`Group ${group} not found in ahura_conf.json! Skipping.`);
         else {
            Object.keys(ahura_conf[group]).forEach(pkg_name => {
               const pkg = require(pkg_name);
               ahura_conf[group][pkg_name].forEach(func_name => {
                  this[func_name] = pkg[func_name];
               });
            });
         }
      });
   }
   _getCaller() {
      /* lightly-modified https://bitbucket.org/ralphv/require-hook/src/c11f906b59d139574283bee9bfafb8bef1628e65/lib/requireHook.js#lines-155 */
      const _prepareStackTrace = Error.prepareStackTrace;
      try {
         Error.prepareStackTrace = function (err, stack) {
            return stack;
         }
         const err = new Error();
         const currentFile = err.stack.shift().getFileName();
         while (err.stack.length) {
            const callerFile = err.stack.shift().getFileName();
            if (callerFile != currentFile) return callerFile;
         }
      } catch (err) {
      } finally {
         Error.prepareStackTrace = _prepareStackTrace;
      }
      return new Error("Cannot determine group name for Ahura via caller file");
   }
}

module.exports = (...args) => {
   return new Ahura(...args);
}
