import java.io.BufferedReader;
import java.io.InputStreamReader;


public class Solution {
	
	static int low[] = new int[32];
	static int high[] = new int[32];
	static int res[] = new int[32];
	
	static int nim(int n) {
		int i = 0;
		for (i=0; (1L << i) <= n; i++);
		return i;
	}
	
	static void init() {
		for (int i=1; i<=31; i++) {
			low[i] = 1 << (i - 1);
			high[i] = (int) (1L * low[i] * 2 - 1);
			
			if (i == 1) res[i] = 1;
			else {
				res[i] = Integer.MAX_VALUE;
				int tmp = i ^ 1;
				for (int from=1; from<=i; from++) {
					int to = tmp ^ from;
					if (to < from) { 
						if (to + 1 == from) {
							res[i] = Math.min(res[i], low[from] - low[to]);
						} else {
							res[i] = Math.min(res[i], low[from] - high[to]);
						}
					}
				}
			}
		}
	}
	
	public static void main(String[] args) throws Exception {
		init();
		
		BufferedReader cin = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder output = new StringBuilder();
		
		for (int T=Integer.parseInt(cin.readLine()); T>0; T--) {
			int n = Integer.parseInt(cin.readLine());
			output.append(res[n % 2 == 0 ? nim(n) : 1]);
			output.append('\n');
		}
		System.out.println(output.toString());

		cin.close();
	}

}