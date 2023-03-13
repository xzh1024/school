import platform from './platform/index';
import svc from './svc/index';
import project from './project';
import pcs from './pcs';
import vms from './vms';
import ground from './ground';
const open = false;
export default [
  ...svc(open),
  ...platform(open),
  ...project(open),
  ...pcs(open),
  ...vms(open),
  ...ground(open)
];
