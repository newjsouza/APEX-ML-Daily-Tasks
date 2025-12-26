# apex_understat.py
# APEX-ML | Scraper Understat para Análise de Apostas

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import time
import json
from datetime import datetime
import pandas as pd

class UnderstatScraper:
    """
    Scraper para extrair dados de xG do Understat
    """
    
    def __init__(self):
        """Inicializa o driver do Chrome"""
        print("🚀 Inicializando APEX Understat Scraper...")
        
        # Configurações do Chrome
        chrome_options = Options()
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
        
        # Você pode comentar a linha abaixo para ver o navegador em ação
        # chrome_options.add_argument("--headless")
        
        # Inicializar driver
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=chrome_options)
        
        self.base_url = "https://understat.com"
        self.data = {}
        
        print("✅ Driver inicializado com sucesso!")
    
    def wait_element(self, by, value, timeout=10):
        """
        Aguarda um elemento carregar na página
        
        Args:
            by: tipo de selector (By.XPATH, By.CLASS_NAME, etc)
            value: o seletor
            timeout: segundos para aguardar
        """
        try:
            element = WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located((by, value))
            )
            return element
        except:
            print(f"⏱️ Timeout ao aguardar: {value}")
            return None
    
    def get_match_xg(self, match_url):
        """
        Extrai xG de um jogo específico
        
        Args:
            match_url: URL completa do jogo no Understat
            
        Returns:
            dict com xG_home, xG_away, resultado
            
        Exemplo:
            match_url = "https://understat.com/match/27278"
        """
        print(f"\n📊 Acessando jogo: {match_url}")
        
        try:
            self.driver.get(match_url)
            time.sleep(3)  # Aguarda JavaScript carregar
            
            # Extrair título do jogo (Team1 vs Team2)
            try:
                title = self.driver.find_element(
                    By.XPATH, 
                    "//h1[contains(@class, 'match-header')]"
                ).text
                print(f"🏆 Jogo: {title}")
            except:
                title = "Unknown Match"
            
            # Extrair xG Home
            try:
                xg_home_element = self.driver.find_element(
                    By.XPATH,
                    "//div[contains(@class, 'xG-home')]//span"
                )
                xg_home = float(xg_home_element.text)
            except:
                xg_home = None
                print("❌ Não conseguiu extrair xG Home")
            
            # Extrair xG Away
            try:
                xg_away_element = self.driver.find_element(
                    By.XPATH,
                    "//div[contains(@class, 'xG-away')]//span"
                )
                xg_away = float(xg_away_element.text)
            except:
                xg_away = None
                print("❌ Não conseguiu extrair xG Away")
            
            # Extrair resultado (se disponível)
            try:
                result = self.driver.find_element(
                    By.XPATH,
                    "//div[@class='match-result']"
                ).text
            except:
                result = "N/A"
            
            # Montar resultado
            if xg_home is not None and xg_away is not None:
                xg_diff = xg_home - xg_away
                data = {
                    'jogo': title,
                    'url': match_url,
                    'xg_home': round(xg_home, 2),
                    'xg_away': round(xg_away, 2),
                    'xg_diff': round(xg_diff, 2),
                    'resultado': result,
                    'timestamp': datetime.now().isoformat()
                }
                
                print(f"✅ xG Home: {xg_home:.2f}")
                print(f"✅ xG Away: {xg_away:.2f}")
                print(f"✅ Diferença: {xg_diff:.2f}")
                
                return data
            else:
                return None
                
        except Exception as e:
            print(f"❌ Erro ao extrair xG: {e}")
            return None
    
    def get_team_stats(self, team_slug):
        """
        Extrai estatísticas históricas de um time
        
        Args:
            team_slug: nome do time em slug (ex: "liverpool")
            
        Returns:
            dict com xG_for, xG_against, média
        """
        print(f"\n📈 Carregando stats do time: {team_slug}")
        
        try:
            url = f"{self.base_url}/team/{team_slug.lower()}/2024-2025"
            self.driver.get(url)
            time.sleep(4)  # Aguarda tabelas carregarem
            
            # Procura pelas estatísticas na página
            # Understat coloca xG em elementos específicos
            
            try:
                # xG For (Gols Esperados a Favor)
                xg_for = self.driver.find_element(
                    By.XPATH,
                    "//td[contains(text(), 'xG')]/following-sibling::td[1]"
                ).text
                xg_for = float(xg_for)
            except:
                xg_for = None
            
            try:
                # xG Against (Gols Esperados Contra)
                xg_against = self.driver.find_element(
                    By.XPATH,
                    "//td[contains(text(), 'xGA')]/following-sibling::td[1]"
                ).text
                xg_against = float(xg_against)
            except:
                xg_against = None
            
            stats = {
                'time': team_slug,
                'xg_for': xg_for,
                'xg_against': xg_against,
                'xg_diff': (xg_for - xg_against) if xg_for and xg_against else None
            }
            
            print(f"✅ xG For: {xg_for}")
            print(f"✅ xG Against: {xg_against}")
            
            return stats
            
        except Exception as e:
            print(f"❌ Erro ao extrair stats: {e}")
            return None
    
    def validar_aposta(self, team1, team2, xg_diff_minimo=0.5):
        """
        Valida se uma aposta tem xG claro o bastante
        
        Args:
            team1: time 1
            team2: time 2
            xg_diff_minimo: diferença xG mínima para aprovar
            
        Returns:
            dict com decisão e análise
        """
        print(f"\n🎯 Validando aposta: {team1} vs {team2}")
        
        stats1 = self.get_team_stats(team1)
        stats2 = self.get_team_stats(team2)
        
        if stats1 and stats2:
            xg_diff = stats1['xg_for'] - stats2['xg_against']
            
            if xg_diff > xg_diff_minimo:
                decision = "✅ APOSTAR"
                classificacao = "CLARA"
            elif xg_diff > 0.2:
                decision = "⚠️ CONSIDERAR"
                classificacao = "MODERADA"
            else:
                decision = "❌ VETO"
                classificacao = "AMBÍGUA"
            
            analise = {
                'team1': team1,
                'team2': team2,
                'xg_diff': round(xg_diff, 2),
                'decision': decision,
                'classificacao': classificacao,
                'timestamp': datetime.now().isoformat()
            }
            
            print(f"Diferença xG: {xg_diff:.2f}")
            print(f"Decisão: {decision}")
            
            return analise
        
        return None
    
    def salvar_dados(self, filename="apex_understat_data.json"):
        """Salva dados coletados em JSON"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
        print(f"\n💾 Dados salvos em: {filename}")
    
    def gerar_relatorio_excel(self, filename="apex_understat_relatorio.xlsx"):
        """Gera relatório em Excel"""
        if not self.data:
            print("❌ Nenhum dado para exportar")
            return
        
        df = pd.DataFrame(self.data)
        df.to_excel(filename, index=False)
        print(f"\n📊 Relatório Excel gerado: {filename}")
    
    def fechar(self):
        """Fecha o driver do navegador"""
        print("\n🛑 Fechando scraper...")
        self.driver.quit()
        print("✅ Scraper fechado com sucesso!")


# ============================================
# EXEMPLOS DE USO
# ============================================

if __name__ == "__main__":
    
    # Inicializar scraper
    scraper = UnderstatScraper()
    
    try:
        
        # EXEMPLO 1: Extrair xG de um jogo específico
        print("\n" + "="*60)
        print("EXEMPLO 1: Extrair xG de Jogo Específico")
        print("="*60)
        
        # Liverpool vs Wolverhampton (exemplo - mude o ID para um jogo real)
        match_url = "https://understat.com/match/27278"  # ID do jogo
        dados_jogo = scraper.get_match_xg(match_url)
        
        if dados_jogo:
            scraper.data['ultimo_jogo'] = dados_jogo
        
        # EXEMPLO 2: Validar aposta
        print("\n" + "="*60)
        print("EXEMPLO 2: Validar Aposta")
        print("="*60)
        
        analise = scraper.validar_aposta("Liverpool", "Wolves")
        
        if analise:
            scraper.data['analise_aposta'] = analise
        
        # EXEMPLO 3: Extrair stats de time específico
        print("\n" + "="*60)
        print("EXEMPLO 3: Stats de Time")
        print("="*60)
        
        stats_liverpool = scraper.get_team_stats("Liverpool")
        if stats_liverpool:
            scraper.data['stats_liverpool'] = stats_liverpool
        
        # Salvar dados coletados
        scraper.salvar_dados()
        
    except Exception as e:
        print(f"❌ Erro geral: {e}")
    
    finally:
        # SEMPRE fechar o scraper
        scraper.fechar()
