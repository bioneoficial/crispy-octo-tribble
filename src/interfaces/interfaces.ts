export interface Selo {
  id?: number;
  id_usuario_operacao: number;
  nome: string;
  descricao: string;
  Imagem?: string;
  ativo: number;
  order?: number;
  order_by_serie?: string;
  destaque: number;
  data_inclusao?: string;
  data_alteracao?: string;
  data_exclusao?: string;
  series_count?: number;
}

export interface Usuario {
  id?: number;
  nome: string;
  descricao?: string;
  email: string;
  senha: string;
  fotoPath?: string;
  ativo?: number;
  role?: string | undefined;
  data_validade_assinatura?: string;
  id_usuario_operacao?: number;
  data_alteracao?: string | undefined;
  data_exclusao?: string | undefined;
  data_inclusao?: string | undefined;
  newPassword?: string;
}

export interface UsuarioAuth {
  id?: number;
  nome: string;
  email: string;
  fotoPath?: string;
  ativo: number;
  role: string;
  data_validade_assinatura?: string;    
  data_inclusao?: string | undefined;
}

export interface userTipoUsuarioData{
  id_usuario: number;
  id_tipo_usuario: number;
}

export interface Politica {
  id?: number;
  id_tipo_politica: number;
  nome: string;
  descricao: string;
  versao?: number;
  ativo: number;
  id_usuario_operacao?: number;
  data_alteracao?: Date;
  data_exclusao?: Date;
  data_inclusao?: Date;
}

export interface TipoPolitica {
  id: number;
  nome: string;
}

export interface UpdatePolitica {
  id?: number;
  id_tipo_politica?: number;
  nome?: string;
  descricao?: string;
  versao?: number;
  ativo?: number;
  id_usuario_operacao: number;
  data_alteracao?: Date;
  data_exclusao?: Date;
  data_inclusao?: Date;
}

export interface AuthInput {
  email: string;
  password: string;
  token?: string;
}

export interface AuthResponse {
  success: boolean,
  token: string;    
  message?: string;
  user?: UsuarioAuth;
}

export interface AuthToken {
  email: string;  
  user_id: number;  
  role: string;
  iat: number;
  exp: number;
}

export interface Role {
  id: number;    
  nome: string;
  id_usuario_operacao?: number;    
  data_alteracao?: Date
  data_exclusao?: Date
  data_inclusao?: Date
}

export interface UpdateSelo {
  id_usuario_operacao: number;
  nome?: string;
  descricao?: string;
  Imagem?: string;
  ativo?: number;
  order?: number;
  order_by_serie?: string;
  destaque?: number;
  data_inclusao?: string;
  data_alteracao?: string;
  data_exclusao?: string;
  series_count?: number;
}

export interface Cupom {
  id?: number;
  nome: string;
  codigo: string;
  limite_uso: number;
  qtd_dias: number;
  data_validade?: string | Date;
  ativo: number;
  id_usuario_operacao?: number;
  data_alteracao?: Date;
  data_exclusao?: Date;
  data_inclusao?: Date;
}

export interface UpdateCupom {
  nome?: string;
  codigo?: string;
  limite_uso?: number;
  qtd_dias?: number;
  data_validade?: string |Date;
  ativo?: number;
  id_usuario_operacao?: number;
  data_alteracao?: Date;
  data_exclusao?: Date;
  qtd_usado?: number;
}

export interface MailContent {
  from: string;
  fromName: string;
  to: string;
  toName: string;
  title: string;
  subject: string;
  template: string;
  context: object;
}

export interface MailConfig {
  hostname?:string;
  port?:number;
  user:string;
  password:string;
  serviceName:string;
}

export interface AuthSessionToken {
  id?: number;
  usuario: string;
  tipo_token?: number;
  codigo: string
  codigo_validado?: boolean;
  token: string;
  tentativas: number | 0;
  data_inclusao?: Date;
  data_expiracao: Date;
  data_alteracao?: Date;
}

export interface TokenValidation {
  code: string;
  token?: string | '';
}

export interface ResetCodeValidation {
  code: string;    
}


export interface AuthResetPassToken {
  user_id?: string;
  usuario?: string;
  iat?: number;
  exp?: number;
}

export interface AuthResetPassResponse {
  success: boolean;    
  message: string;
  token?: AuthResetPassToken;
}

export interface VitrineConteudo {
  id?: number;
  nome: string;
  ordem: number;    
  ativo: number;
  id_usuario_operacao?: number;
  id_tipo_vitrine_conteudo: number;
  data_alteracao?: Date;
  data_exclusao?: Date;
  data_inclusao?: Date;
}

export interface VitrineConteudoUpdate {
  id?: number;
  nome?: string;
  ordem?: number;    
  ativo?: number;
  id_usuario_operacao: number;
  id_tipo_vitrine_conteudo?: number;
  data_alteracao?: Date;
  data_exclusao?: Date;
  data_inclusao?: Date;
}

export interface Conteudo {
  id?: number;
  nome: string;
  descricao: string;
  slug: string;
  imagem_capa: string;
  imagem_miniatura: string;
  imagem_banner: string;
  publicado: number;
  selecao?: number;
  premium?: number;
  moderada?: number;
  id_usuario_operacao: number;
  data_alteracao?: Date;
  data_exclusao?: Date;
  data_inclusao?: Date;
}

export interface ConteudoHome {
  id?: number;
  nome: string;
  slug: string;
  imagem_capa: string;
  imagem_banner: string;  
}

export interface VitrineConteudoHome {
  //id: number;
  //nome: string;
  //ordem: number;
  //conteudo: ConteudoHome[];
  vitrine_conteudo_id : number;
  vitrine_conteudo_nome: string;
  vitrine_conteudo_ordem: string;
  conteudo_nome: string;
  conteudo_id: number;
  imagem_banner: string;
  imagem_capa: string;
}

export interface ConteudoUpdate {
  nome: string;
  descricao: string;
  slug: string;
  imagem_capa: string;
  imagem_miniatura: string;
  imagem_banner: string;
  publicado: number;
  selecao: number;
  premium: number;
  moderada: number;
  data_alteracao?: Date;  
  data_inclusao?: Date;
}

export interface ConteudoVitrineConteudo{
  id?: number;
  id_conteudo: number;
  id_vitrine_conteudo: number;
  ordem: number;
  id_usuario_operacao: number;
  data_alteracao?: Date;
  data_exclusao?: Date;
  data_inclusao?: Date;
}

export interface ConteudoVitrineConteudoUpdate{
  id?: number;
  id_conteudo?: number;
  id_vitrine_conteudo?: number;
  ordem?: number;
  id_usuario_operacao: number;
  data_alteracao?: Date;
  data_exclusao?: Date;
  data_inclusao?: Date;
}

export interface ConfiguracaoHome {
  id?: number;
  habilitar_banner_selecao?: number;
  url_banner_assinatura?: string;
  habilitar_pagina_assinatura?: number;
  nome_editora?: string;
  descricao_editora?: string;
  imagem_editora?: string;
  id_usuario_operacao?: number;
  data_alteracao?: Date | string;
  data_exclusao?: Date | string;
  data_inclusao?: Date | string;
  qtd_item_home?: number;
  qtd_item_ultimos_dia?: number;
}

export interface Episodio {  
  id?: number;
  nome: string;
  id_conteudo: number;
  id_usuario_operacao: number;
  thumb?: string;
  publicado?: number | 1;
  ordem: number | 0;
  premium?: number | 0;
  view?: number | 0;
  curtida?: number | 0;
  data_publicacao: string | Date;
  data_alteracao?: Date;
  data_exclusao?: Date;
  data_inclusao?: Date;  
  slug?: string;  
}

export interface EpisodioSearchByName {  
  nome: string;  
}

export interface EpisodioImagem {  
  episodio_id?: number;
  position: number;
  url: string;  
  data_inclusao?: Date;
}

export interface UserToAutor {
  fullName: string;
  cpfOrCnpj: string;
  termsOfUse: boolean;
  copyright: boolean;
  ageConfirmation: boolean;
  id_usuario_operacao: number;
}