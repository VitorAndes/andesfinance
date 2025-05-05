{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.bun
    pkgs.git
  ];

  shellHook = ''
    export PATH=$PATH:${pkgs.nodejs}/bin
    export PATH=$PATH:${pkgs.pnpm}/bin  
  '';
}