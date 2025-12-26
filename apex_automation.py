# apex_automation.py
from apex_understat import UnderstatScraper
import schedule
import time
from datetime import datetime, timedelta

class APEXAutomacao:
    """
    Automação APEX para validação de apostas 30 min antes dos jogos
    """
    
    def __init__(self):
        self.scraper = UnderstatScraper()
    
    def validar_aposta_30min_antes(self, jogo_id, team1, team2, horario_jogo):
        """
        Valida aposta 30 min antes do jogo
        
        Args:
            jogo_id: ID do jogo no Understat
            team1: Time 1
            team2: Time 2
            horario_jogo: "15:00" (formato HH:MM)
        """
        
        # Calcular hora de validação (30min antes)
        hora, minuto = map(int, horario_jogo.split(':'))
        hora_validacao = datetime.now().replace(hour=hora, minute=minuto) - timedelta(minutes=30)
        
        print(f"\n⏰ Agendando validação para {hora_validacao.strftime('%H:%M')}")
        print(f"   Jogo: {team1} vs {team2} ({horario_jogo})")
        
        # Agendar
        schedule.every().day.at(hora_validacao.strftime("%H:%M")).do(
            self.executar_validacao,
            jogo_id=jogo_id,
            team1=team1,
            team2=team2
        )
    
    def executar_validacao(self, jogo_id, team1, team2):
        """Executa validação e emite alerta"""
        
        print(f"\n🔔 VALIDAÇÃO EXECUTADA: {team1} vs {team2}")
        
        # Extrair dados atualizados
        match_url = f"https://understat.com/match/{jogo_id}"
        dados = self.scraper.get_match_xg(match_url)
        
        if dados:
            if abs(dados['xg_diff']) > 0.5:
                print("✅ Aposta APROVADA - xG claro")
            else:
                print("⚠️ Aposta DUVIDOSA - considere reduzir stake")
        
        return dados
    
    def iniciar_loop(self):
        """Inicia loop de agendamento"""
        print("\n🚀 APEX Automação iniciada")
        print("Aguardando horários agendados...")
        
        while True:
            schedule.run_pending()
            time.sleep(60)

# Exemplo de uso
if __name__ == "__main__":
    
    apex = APEXAutomacao()
    
    # Agendar validações
    apex.validar_aposta_30min_antes(
        jogo_id=27278,
        team1="Liverpool",
        team2="Wolverhampton",
        horario_jogo="15:00"
    )
    
    apex.validar_aposta_30min_antes(
        jogo_id=27279,
        team1="Chelsea",
        team2="Aston Villa",
        horario_jogo="18:30"
    )
    
    # Iniciar
    apex.iniciar_loop()
