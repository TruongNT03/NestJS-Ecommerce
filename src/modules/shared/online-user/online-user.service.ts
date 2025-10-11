import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class OnlineUserService {
  private onlineAccount: Map<string, Set<Socket>>;
  private onlineAdmin: Map<string, Set<Socket>>;

  constructor() {
    this.onlineAdmin = new Map();
    this.onlineAccount = new Map();
  }

  addAdminOnline(userId: string, socket: Socket) {
    const socketSet = this.onlineAdmin.get(userId);
    if (socketSet && socketSet.size) {
      socketSet.add(socket);
    } else {
      this.onlineAdmin.set(userId, new Set([socket]));
    }
  }

  deleteAdminOnline(userId: string, socket: Socket) {
    const socketSet = this.onlineAdmin.get(userId);
    if (socketSet) {
      socketSet.delete(socket);
      if (socketSet.size === 0) this.onlineAdmin.delete(userId);
    }
  }

  getAdminOnline() {
    return Array.from(this.onlineAdmin.keys());
  }

  addAccountOnline(userId: string, socket: Socket) {
    const socketSet = this.onlineAccount.get(userId);
    if (socketSet && socketSet.size) {
      socketSet.add(socket);
    } else {
      this.onlineAccount.set(userId, new Set([socket]));
    }
  }

  deleteAccountOnline(userId: string, socket: Socket) {
    const socketSet = this.onlineAccount.get(userId);
    if (socketSet) {
      socketSet.delete(socket);
      if (socketSet.size === 0) this.onlineAccount.delete(userId);
    }
  }

  getAccountOnline(userId: string): Socket[] {
    const socketSet = this.onlineAccount.get(userId);
    if (socketSet && socketSet.size) {
      return Array.from(socketSet);
    } else {
      return [];
    }
  }
}
