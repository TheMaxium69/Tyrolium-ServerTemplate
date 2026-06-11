import { Component, inject, signal, ViewEncapsulation, OnInit } from '@angular/core';
import { TyroUiLangService } from 'tyrolium-ui';

interface ServerType {
  prefix: string;
  name: string;
  nameEn: string;
  icon: string;
}

const SERVER_TYPES: ServerType[] = [
  { prefix: 'int',      name: 'Serveur Interne',   nameEn: 'Internal Server', icon: '/assets/tyrolium-ui/server/int.png'   },
  { prefix: 'vps',      name: 'VPS',               nameEn: 'VPS',             icon: '/assets/tyrolium-ui/server/vps.png'   },
  { prefix: 'cloud',    name: 'Cloud',             nameEn: 'Cloud',           icon: '/assets/tyrolium-ui/server/cloud.png' },
  { prefix: 'proxy',    name: 'Proxy',             nameEn: 'Proxy',           icon: '/assets/tyrolium-ui/server/proxy.png' },
  { prefix: 'serv',     name: 'Serveur dédié',     nameEn: 'Dedicated',       icon: '/assets/tyrolium-ui/server/serv.png'  },
  { prefix: 'database', name: 'Base de données',   nameEn: 'Database',        icon: '/assets/tyrolium-ui/server/db.png'    },
  { prefix: 'vpn',      name: 'VPN',               nameEn: 'VPN',             icon: '/assets/tyrolium-ui/server/vpn.png'   },
];

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None,
})
export class Home implements OnInit {
  readonly lang = inject(TyroUiLangService).lang;

  serverName = signal('');
  serverType = signal<ServerType | null>(null);

  ngOnInit() {
    fetch('/assets/server.json')
      .then(r => r.json())
      .then((data: { name: string; prefix: string }) => {
        this.serverName.set(data.name);
        const type = SERVER_TYPES.find(t => t.prefix === data.prefix) ?? null;
        this.serverType.set(type);
      })
      .catch(() => {
        this.serverName.set('server');
      });
  }

  typeName(): string {
    const t = this.serverType();
    if (!t) return '';
    return this.lang() === 'en' ? t.nameEn : t.name;
  }
}
