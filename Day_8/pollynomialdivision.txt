import java.io.*;
import java.util.*;

public class D {

	BufferedReader br;
	PrintWriter out;
	StringTokenizer st;
	boolean eof;

	static final int P = 1_000_000_007;

	int pow(int a, int b) {
		int ret = 1;
		for (; b > 0; b >>= 1) {
			if ((b & 1) == 1) {
				ret = (int) ((long) ret * a % P);
			}
			a = (int) ((long) a * a % P);
		}
		return ret;
	}

	void add(long[] f, int pos, long delta) {
		for (int i = pos; i < f.length; i |= i + 1) {
			f[i] += delta;
		}
	}

	long get(long[] f, int pos) {
		long ret = 0;
		for (int i = pos; i >= 0; i = (i & (i + 1)) - 1) {
			ret += f[i];
		}
		return ret;
	}

	void solve() throws IOException {
		int n = nextInt();
		int a = nextInt();
		int b = nextInt();
		int q = nextInt();

		int x;
		if (a == 0) {
			x = 1;
		} else {
			x = (int) ((long) b * pow(a, P - 2) % P);
			if (x != 0) {
				x = P - x;
			}
		}

		int[] pow = new int[n];
		pow[0] = 1;
		for (int i = 1; i < n; i++) {
			pow[i] = (int) ((long) pow[i - 1] * x % P);
		}

		int[] arr = new int[n];
		int[] arrX = new int[n];
		long[] fen = new long[n];

		for (int i = 0; i < n; i++) {
			arr[i] = nextInt();
			arrX[i] = (int) ((long) arr[i] * pow[i] % P);
			add(fen, i, arrX[i]);
		}

		for (int i = 0; i < q; i++) {
			int type = nextInt();
			if (type == 1) {
				int pos = nextInt();
				int val = nextInt();
				add(fen, pos, -arrX[pos]);

				arr[pos] = val;
				arrX[pos] = (int) ((long) val * pow[pos] % P);
				add(fen, pos, arrX[pos]);
			} else {
				int l = nextInt();
				int r = nextInt();
				
				// [l; r]
				
				long sumR = get(fen, r);
				long sumL = get(fen, l - 1);
				
				if (a == 0 && b == 0) {
					out.println(sumR - sumL == 0 ? "Yes" : "No");
				} else if (a == 0 && b != 0) {
					out.println("Yes");
				} else if (a != 0 && b == 0) {
					out.println(arr[l] == 0 ? "Yes" : "No");
				} else {
					out.println((sumR - sumL) % P == 0 ? "Yes" : "No");
				}
			}
		}

	}

	D() throws IOException {
		br = new BufferedReader(new InputStreamReader(System.in));
		out = new PrintWriter(System.out);
		solve();
		out.close();
	}

	public static void main(String[] args) throws IOException {
		new D();
	}

	String nextToken() {
		while (st == null || !st.hasMoreTokens()) {
			try {
				st = new StringTokenizer(br.readLine());
			} catch (Exception e) {
				eof = true;
				return null;
			}
		}
		return st.nextToken();
	}

	String nextString() {
		try {
			return br.readLine();
		} catch (IOException e) {
			eof = true;
			return null;
		}
	}

	int nextInt() throws IOException {
		return Integer.parseInt(nextToken());
	}

	long nextLong() throws IOException {
		return Long.parseLong(nextToken());
	}

	double nextDouble() throws IOException {
		return Double.parseDouble(nextToken());
	}
}