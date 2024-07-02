type RoleKey = 2 | 3;

export class RoleDictionary {
  private static dictionary: Record<RoleKey, string> = { 2: 'cliente', 3: 'administrador' };

  static translate(role: RoleKey | undefined): string {
    if (!role) return 'Não informado';
    return this.dictionary[role] || 'Não informado';
  }
}
